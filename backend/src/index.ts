import express from "express";
import mongoose from "mongoose";
import UserRoute from './routes/UserRoute'
import { seadInitalProducts } from "./services/productService";
import productRoute from './routes/productRoute'
import cartRoute from './routes/cartRoute'
const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/ecommerce")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(err)) ;

app.use(express.json());

app.use('/users', UserRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);

seadInitalProducts();





















app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
