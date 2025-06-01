import express from "express";
import mongoose from "mongoose";
import UserRoute from './routes/UserRoute'
import { seedInitialProducts } from "./services/productService";
import productRoute from './routes/productRoute'
import cartRoute from './routes/cartRoute'
import dotenv from 'dotenv';
import cors from 'cors';  

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(err)) ;

app.use(cors());
app.use('/user', UserRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);

seedInitialProducts();





















app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
