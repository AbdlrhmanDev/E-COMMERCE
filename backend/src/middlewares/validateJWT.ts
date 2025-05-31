import { NextFunction, Request, Response, RequestHandler } from "express";
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { UserModel } from "../models/userModel";
import { ExtendedRequest } from "../types/ExtendedRequest";

//TODO: check if this is the correct way to do this
const validateJWT: RequestHandler = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    //TODO: check if this is the correct way to do this
  const authorizationHeader = req.get("authorization");
  //TODO: check if this is the correct way to do this
  if(!authorizationHeader) {
    res.status(401).send("Authorization header is required");
    return;
  }
  //TODO: check if this is the correct way to do this
  const token = authorizationHeader.split(" ")[1];
  //TODO: check if this is the correct way to do this
  if(!token) {
    res.status(403).send("Bearer token not found");
    return;
  }
  //TODO: check if this is the correct way to do this
  jwt.verify(token, "mec7fsReLFZMjEj7jxXdPCZ926tEZrBD", async (err, payload) => {
    //TODO: check if this is the correct way to do this
    if(err) {
      if (err instanceof TokenExpiredError) {
        res.status(401).json({
          error: 'Token expired',
          message: 'Your session has expired. Please log in again.',
          expiredAt: err.expiredAt
        });
        return;
      }
      console.log(err);
      res.status(403).json({
        error: 'Invalid token',
        message: 'The provided token is invalid'
      });
      return;
    }
    //TODO: check if this is the correct way to do this
    if(!payload) {
      res.status(403).send("Invalid token payload");
      return;
    }
    //TODO: check if this is the correct way to do this
    const userPayload = payload as {email: string; firstName: string; lastName: string};
    //TODO: check if this is the correct way to do this
    try {
      //TODO: check if this is the correct way to do this
      const user = await UserModel.findOne({email: userPayload.email});
      //TODO: check if this is the correct way to do this
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      //TODO: check if this is the correct way to do this
      req.user = user;
      //TODO: check if this is the correct way to do this
      next();
    } catch (error) {
      //TODO: check if this is the correct way to do this
      res.status(500).send("Internal server error");
      return;
    }
  });
}

export default validateJWT;
