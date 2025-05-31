import express, { Request, Response, NextFunction, response } from "express";
import { CartModel } from "../models/cartModel";
import { addItemToCart, getActiveCartForUser } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendedRequest } from "../types/ExtendedRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).json(cart);
});

router.post("/add-item", validateJWT, async (req: ExtendedRequest, res: Response) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const result = await addItemToCart({ userId, productId, quantity });
    if (result) {
        res.status(result.statusCode).json(result.data);
    } else {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
