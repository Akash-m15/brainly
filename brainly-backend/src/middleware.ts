import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JWT_PASSWORD } from "./config";

export function authMiddleware(req: Request , res:Response , next : NextFunction){
  //@ts-ignore
  const token = req.header('authorization');
  const decoded = jwt.verify(token as string,JWT_PASSWORD);

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
