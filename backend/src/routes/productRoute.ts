import { Router } from "express";
import express from "express";
import { getAllProducts } from "../services/productService";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch products',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});

export default router;

