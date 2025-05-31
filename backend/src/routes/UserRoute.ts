import { Router, Request, Response, RequestHandler } from "express";
import express from "express";
import { registerUser, loginUser } from "../services/userService";

const router = express.Router();

// Register a new user
const registerHandler: RequestHandler = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        const {data, statusCode} = await registerUser({firstName, lastName, email, password});
        res.status(statusCode).send(data);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'An error occurred during registration'
        });
    }
};

const loginHandler: RequestHandler = async (req, res) => {
    try {
        console.log('Login request received:', {
            headers: req.headers,
            body: req.body,
            contentType: req.get('content-type')
        });
        
        if (!req.body) {
            res.status(400).json({
                error: 'Invalid request',
                message: 'Request body is missing or invalid'
            });
            return;
        }

        const {email, password} = req.body;
        if (!email || !password) {
            res.status(400).json({
                error: 'Missing credentials',
                message: 'Email and password are required'
            });
            return;
        }

        const {data, statusCode} = await loginUser({email, password});
        res.status(statusCode).send(data);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'An error occurred during login'
        });
    }
};

router.post('/register', registerHandler);
router.post('/login', loginHandler);

export default router;



