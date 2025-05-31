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