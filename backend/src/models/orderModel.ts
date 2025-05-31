import mongoose, { Schema , Document, ObjectId } from "mongoose";

export interface IOrderItem {
productTitle: string;
productImage: string;
uniyPrice: number;
quantity: number;
}

export interface IOrder extends Document {
    orderItems: IOrderItem[];
    total: number;
    address: string;
    userId: ObjectId | string;

}

const orderItemSchema = new Schema<IOrderItem>({
    productTitle: {type: String, required: true},
    productImage: {type: String, required: true},
    uniyPrice: {type: Number, required: true},
    quantity: {type: Number, required: true},
});


const orderSchema = new Schema<IOrder>({
    orderItems: [orderItemSchema],
    total: {type: Number, required: true},
    address: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
});

export const OrderModel = mongoose.model<IOrder>("Order", orderSchema);
