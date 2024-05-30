import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";


const verifyToken = 
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const publicKey = fs.readFileSync("public.pem");
      const decoded = jwt.verify(token, publicKey);
        if (!decoded){
          return res.status(401).json({ message: "Unauthorized" });
        }
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(403).json({ message: "Unauthorized" });
    }}

export default verifyToken;
