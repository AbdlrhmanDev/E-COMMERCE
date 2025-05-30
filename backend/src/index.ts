import express from "express";
import mongoose from "mongoose";
import UserRoute from './routes/UserRoute'
const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/ecommerce")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(err)) ;

app.use(express.json());

app.use('/users', UserRoute);





















app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
