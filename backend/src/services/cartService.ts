import { CartModel } from "../models/cartModel";
import { IOrderItem, OrderModel } from "../models/orderModel";
import { ProductModel } from "../models/productModel";

interface CreateCartForUser {
    userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
    try {
        const cart = await CartModel.create({ userId, totalPrice: 0 });
        await cart.save();
        return cart;
    } catch (error) {
        throw new Error("Failed to create cart: " + (error as Error).message);
    }
}

interface GetActiveCartForUser {
    userId: string;
    populate?: boolean;
}

export const getActiveCartForUser = async ({ userId, populate }: GetActiveCartForUser) => {
    try {

        let cart; 
        if (populate) {
            cart = await CartModel.findOne({ userId, status: "active" }).populate("items.product");
        } else {
            cart = await CartModel.findOne({ userId, status: "active" });
        }

        if (!cart) {
            cart = await createCartForUser({ userId });
        }

      

        return cart;
    } catch (error) {
        throw new Error("Failed to get active cart: " + (error as Error).message);
    }
}

interface ClearCart {
    userId: string;
}

export const clearCart = async ({ userId }: ClearCart) => {
    try {
        const cart = await getActiveCartForUser({ userId });
        cart.items = [];
        cart.totalPrice = 0;
        const updatedCart = await cart.save();
        return { data: updatedCart, statusCode: 200 };
    } catch (error) {
        return { data: "Failed to clear cart: " + (error as Error).message, statusCode: 500 };
    }
}

interface AddItemToCart {
    userId: string;
    productId: any;
    quantity: number;
}

export const addItemToCart = async ({ userId, productId, quantity }: AddItemToCart) => {
    try {
        const cart = await getActiveCartForUser({ userId });

        const existingUncartItem = cart.items.find((item) => item.product.toString() === productId.toString());

        if (existingUncartItem) {
            return { data: "Product already in cart", statusCode: 400 };
        }

        const product = await ProductModel.findById(productId);

        if (!product) {
            return { data: "Product not found", statusCode: 404 };
        }

        if (product.stock < quantity) {
            return { data: "Low stock for this product", statusCode: 400 };
        }

        cart.items.push({
            product: productId,
            unitPrice: product.price,
            quantity: quantity
        });

        cart.totalPrice += product.price * quantity;
 await cart.save();
        return { data: await getActiveCartForUser({ userId, populate: true }), statusCode: 200 };
    } catch (error) {
        return { data: "Failed to add item to cart: " + (error as Error).message, statusCode: 500 };
    }
}

interface UpdateItemInCart {
    userId: string;
    productId: any;
    quantity: number;
}

export const updateItemInCart = async ({ userId, productId, quantity }: UpdateItemInCart) => {
    try {
        const cart = await getActiveCartForUser({ userId });

        const existingCartItem = cart.items.find((item) => item.product.toString() === productId.toString());
        const otherCartItems = cart.items.filter(p => p.product.toString() !== productId.toString());

        if (!existingCartItem) {
            return { data: "Product not found in cart", statusCode: 404 };
        }

        if (quantity <= 0) {
            return { data: "Quantity must be greater than 0", statusCode: 400 };
        }

        const product = await ProductModel.findById(productId);
        if (!product) {
            return { data: "Product not found", statusCode: 404 };
        }

        if (product.stock < quantity) {
            return { data: "Low stock for this product", statusCode: 400 };
        }

        let total = otherCartItems.reduce((total, item) => {
            return total + (item.unitPrice * item.quantity);
        }, 0);

        total += existingCartItem.unitPrice * quantity;
        existingCartItem.quantity = quantity;
        cart.totalPrice = total;

        await cart.save();
        return { data: await getActiveCartForUser({ userId, populate: true }), statusCode: 200 };
    } catch (error) {
        return { data: "Failed to update cart item: " + (error as Error).message, statusCode: 500 };
    }
}

interface RemoveItemFromCart {
    userId: string;
    itemId: string;
}

export const removeItemFromCart = async ({ userId, itemId }: RemoveItemFromCart) => {
    try {
        const cart = await getActiveCartForUser({ userId });

        const existingCartItem = cart.items.find((item) => item.product.toString() === itemId.toString());
        if (!existingCartItem) {
            return { data: "Product not found in cart", statusCode: 404 };
        }

        const otherCartItems = cart.items.filter(p => p.product.toString() !== itemId.toString());

        let total = otherCartItems.reduce((total, item) => {
            return total + (item.unitPrice * item.quantity);
        }, 0);

        cart.totalPrice = total;
        cart.items = otherCartItems;
       await cart.save();
        return { data: await getActiveCartForUser({ userId, populate: true }), statusCode: 200 };
    } catch (error) {
        return { data: "Failed to remove item from cart: " + (error as Error).message, statusCode: 500 };
    }
}

interface CheckoutCart {
    userId: string;
    address: string;
}

export const checkoutCart = async ({ userId, address }: CheckoutCart) => {
    try {
        if (!address) {
            return { data: "Address is required", statusCode: 400 };
        }

        const cart = await getActiveCartForUser({ userId });
        
        if (cart.items.length === 0) {
            return { data: "Cart is empty", statusCode: 400 };
        }

        const orderItems: IOrderItem[] = [];
        for (const item of cart.items) {
            const product = await ProductModel.findById(item.product);
            if (!product) {
                return { data: "Product not found", statusCode: 404 };
            }

            if (product.stock < item.quantity) {
                return { data: `Insufficient stock for product: ${product.name}`, statusCode: 400 };
            }

            // Update product stock
            product.stock -= item.quantity;
            await product.save();

            const orderItem: IOrderItem = {
                productTitle: product.name,
                productImage: product.image,
                uniyPrice: product.price,
                quantity: item.quantity
            }

            orderItems.push(orderItem);
        }

        const order = await OrderModel.create({
            orderItems,
            total: cart.totalPrice,
            address: address,
            userId: userId
        });
        await order.save();

        // Mark cart as completed
        cart.status = "completed";
        await cart.save();

        return { data: order, statusCode: 200 };
    } catch (error) {
        return { data: "Failed to checkout cart: " + (error as Error).message, statusCode: 500 };
    }
}
