import express, { Request, Response, NextFunction, response } from "express";
import { CartModel } from "../models/cartModel";
import { addItemToCart, clearCart, getActiveCartForUser, removeItemFromCart, updateItemInCart } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendedRequest } from "../types/ExtendedRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).json(cart);
});


router.delete("/", validateJWT, async (req: ExtendedRequest, res: Response) => {
    const userId = req.user._id;
    const result = await clearCart({ userId });
    res.status(result.statusCode).json(result.data);
});

router.post("/items", validateJWT, async (req: ExtendedRequest, res: Response) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const result = await addItemToCart({ userId, productId, quantity });
    if (result) {
        res.status(result.statusCode).json(result.data);
    } else {
        res.status(500).json({ message: "Internal server error" });
    }
});


router.put("/items", validateJWT, async (req: ExtendedRequest, res: Response) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const result = await updateItemInCart({ userId, productId, quantity });
    if (result) {
        res.status(result.statusCode).json(result.data);
    } else {
        res.status(500).json({ message: "Internal server error" });
    }
});


router.delete("/items/:itemId", validateJWT, async (req: ExtendedRequest, res: Response) => {
    const userId = req.user._id;
    const { itemId } = req.params;
    const result = await removeItemFromCart({ userId, itemId });
    if (result) {
        res.status(result.statusCode).json(result.data);
    } else {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
