import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authMiddleware(req: Request , res:Response , next : NextFunction){
  //@ts-ignore
  const token = req.header('authorization');
  const decoded = jwt.verify(token as string,process.env.JWT_PASSWORD as string);

  if(decoded)
  {
    // console.log(decoded)
    //@ts-ignore
    req.body.userId = decoded.userId
    // console.log(req.body)
    next();
  }
  else{
    res.status(403).json({
      message : "You are not logged in!!!"
    })
  }




}
