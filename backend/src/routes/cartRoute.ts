import express, { Request, Response, NextFunction, response } from "express";
import { CartModel } from "../models/cartModel";
import { addItemToCart, checkoutCart, clearCart, getActiveCartForUser, removeItemFromCart, updateItemInCart } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendedRequest } from "../types/ExtendedRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendedRequest, res: Response) => {
    try {
        const userId = req.user._id;
        const cart = await getActiveCartForUser({ userId , populate: true});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/", validateJWT, async (req: ExtendedRequest, res: Response) => {
    try {
        const userId = req.user._id;
        const result = await clearCart({ userId });
        res.status(result.statusCode).json(result.data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/items", validateJWT, async (req: ExtendedRequest, res: Response) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;
        const result = await addItemToCart({ userId, productId, quantity });
        if (result) {
            res.status(result.statusCode).json(result.data);
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/items", validateJWT, async (req: ExtendedRequest, res: Response) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;
        const result = await updateItemInCart({ userId, productId, quantity });
        if (result) {
            res.status(result.statusCode).json(result.data);
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/items/:itemId", validateJWT, async (req: ExtendedRequest, res: Response) => {
    try {
        const userId = req.user._id;
        const { itemId } = req.params;
        const result = await removeItemFromCart({ userId, itemId });
        if (result) {
            res.status(result.statusCode).json(result.data);
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/checkout", validateJWT, async (req: ExtendedRequest, res: Response) => {
    try {
        const userId = req.user._id;
        const { address } = req.body;
        const response = await checkoutCart({userId, address});
        
        if (response) {
            res.status(response.statusCode).json(response.data);
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
