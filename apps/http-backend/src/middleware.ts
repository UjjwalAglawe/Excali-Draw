import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const { JWT_SECRET } = require("@repo/backend-common/config");
// const JWT_SECRET="ujjwal123";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export function middleware(req:Request,res:Response,next:NextFunction){

    const token=req.headers["authorization"] ?? "";

    const decoded=jwt.verify(token,JWT_SECRET);

    if(decoded){
        req.userId=(decoded as JwtPayload).userId;
        next();
    }
    else{
        res.status(401).json({message:"Unauthorized"});
    }
}