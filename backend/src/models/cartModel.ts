import mongoose, { Schema , Document, ObjectId } from "mongoose";
import { IProduct } from "./productModel";

const CartStatusEnum = ["active", "completed"] ;

export interface ICartItem {
    product: IProduct;
    quantity: number;
    unitPrice: number;
}

export interface ICart extends Document {
    userId: ObjectId | string;
    items: ICartItem[];
    totalPrice: number;
    status: "active" | "completed" ;
}

const cartItemSchema: Schema<ICartItem> = new Schema({

    product: {type: Schema.Types.ObjectId, ref: "Product", required: true},
    quantity: {type: Number, required: true , default: 1},
    unitPrice: {type: Number, required: true}
});



const cartSchema = new Schema<ICart>({
    userId: {type: Schema.Types.ObjectId , ref: "User", required: true },
    items: [cartItemSchema],
    totalPrice: {type: Number, required: true},
    status: {type: String, required: true, enum: CartStatusEnum ,default: "active"}
});

export const CartModel = mongoose.model<ICart>("Cart", cartSchema);
