import mongoose, { Schema , Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    image: string;
    price: number;
    category: string;
    stock: number;
   
}

const productSchema: Schema<IProduct> = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    stock: {type: Number, required: true , default: 0} ,
});

export const ProductModel = mongoose.model<IProduct>("Product", productSchema);
