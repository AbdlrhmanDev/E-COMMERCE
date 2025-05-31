import { CartModel } from "../models/cartModel";
import { ProductModel } from "../models/productModel";

interface CreateCartForUser {
    userId: string;
}


 const createCartForUser = async ({userId}: CreateCartForUser) => {

    const cart = await CartModel.create({userId , totalPrice: 0});
    await cart.save();
    return cart;

}

interface GetActiveCartForUser {
    userId: string;
}
export const getActiveCartForUser = async ({userId}: GetActiveCartForUser) => {
    let cart = await CartModel.findOne({userId, status: "active"});

    if (!cart) {
        cart = await createCartForUser({userId});
    }

    return cart;
}


interface ClearCart {
    userId: string;
}

export const clearCart = async ({userId}: ClearCart) => {
    const cart = await getActiveCartForUser({userId});
    cart.items = [];
    cart.totalPrice = 0;
    const updatedCart = await cart.save();
    return {data: updatedCart, statusCode: 200};
}




interface AddItemToCart {
    userId: string;
    productId: any;
    quantity: number;
}

export const addItemToCart = async ({userId, productId, quantity}: AddItemToCart) => {
    const cart = await getActiveCartForUser({userId});

    //TODO: check if the product exists
    const existingUncartItem = cart.items.find((item) => item.product.toString() === productId.toString());

    if (existingUncartItem) {
        return {data: "Product already in cart", statusCode: 400};
    }

    //TODO: check if the product exists in the database fetch the product
    const product = await ProductModel.findById(productId);

    if (!product) {
        return {data: "Product not found", statusCode: 404};
    }

    if (product.stock < quantity) {
        return {data: "Low stock for this product", statusCode: 400};
    }
    //TODO: add the product to the cart
    cart.items.push({
        product: productId,
        unitPrice: product.price,
        quantity: quantity
    });

    cart.totalPrice += product.price * quantity;

    const updatedCart = await cart.save();

    return {data: updatedCart, statusCode: 200};
}

interface UpdateItemInCart {
    userId: string;
    productId: any;
    quantity: number;
}
export const updateItemInCart = async ({userId, productId, quantity}: UpdateItemInCart) => {
    const cart = await getActiveCartForUser({userId});

    const existingCartItem = cart.items.find((item) => item.product.toString() === productId.toString());
    const  otherCartItems = cart.items.filter(p=> p.product.toString() !== productId.toString());

    if (!existingCartItem) {
        return {data: "Product not found in cart", statusCode: 404};
    }

    if (quantity <= 0) {
        return {data: "Quantity must be greater than 0", statusCode: 400};
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
        return {data: "Product not found", statusCode: 404};
    }

    if (product.stock < quantity) {
        return {data: "Low stock for this product", statusCode: 400};
    }

    let total = otherCartItems.reduce((total, item) =>{
    

        total + (item.unitPrice * item.quantity);
        return total;
     }, 0);
 
    total += existingCartItem.unitPrice * existingCartItem.quantity;
    existingCartItem.quantity = quantity;
     cart.totalPrice=total;

   
    const updatedCart = await cart.save();
    return {data: updatedCart, statusCode: 200};
}

interface removeItemFromCart {
    userId: string;
    itemId: string;
}

export const removeItemFromCart = async ({userId, itemId}: removeItemFromCart) => {
    const cart = await getActiveCartForUser({userId});


    const existinInCart = cart.items.find((item) => item.product.toString() === itemId.toString());
    if (!existinInCart) {
        return {data: "Product not found in cart", statusCode: 404};
    }
    const  otherCartItems = cart.items.filter(p=> p.product.toString() !== itemId.toString());

    let total = otherCartItems.reduce((total, item) =>{
    

        total + (item.unitPrice * item.quantity);
        return total;
     }, 0);

    cart.totalPrice = total;
    cart.items = otherCartItems;
    const  updatedCart = await cart.save();
    return {data: updatedCart, statusCode: 200};
}


