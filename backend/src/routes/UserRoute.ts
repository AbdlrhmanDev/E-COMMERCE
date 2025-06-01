import { Router, Request, Response, RequestHandler } from "express";
import express from "express";
import { registerUser, loginUser, getOrdersByUserId } from "../services/userService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendedRequest } from "../types/ExtendedRequest";
const router = express.Router();




router.post('/register', async (req, res) => {
    try {   
        const {firstName, lastName, email, password} = req.body;
        const {data, statusCode} = await registerUser({firstName, lastName, email, password});
        res.status(statusCode).json(data);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
});

// router.post('/login', async (req, res) => {
//     try {
//         const {email, password} = req.body;
//         const {data, statusCode} = await loginUser({email, password});
//         res.status(statusCode).json(data);
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({
//             message: "Internal server error",
//             error: error instanceof Error ? error.message : "Unknown error"
//         });
//     }
// });

router.post("/login", async (request, response) => {
    try {
      const { email, password } = request.body;
      const { statusCode, data } = await loginUser({ email, password });
      response.status(statusCode).json(data);
    } catch {
      response.status(500).send("Something went wrong!");
    }
  });
  


router.get('/my-orders', validateJWT, async (req: ExtendedRequest, res) => {
    try {
        const userId = req.user._id;
        const orders = await getOrdersByUserId({userId});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
});
export default router;




