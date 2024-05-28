import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
const app = express();

const verifyToken = app.get(
  "/user",
  (req: Request, res: Response, next: NextFunction) => {
    const headers = req.body;
    const token = headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const publicKey = fs.readFileSync("public.pem");
      const decoded = jwt.verify(token, publicKey);
      next();
      return decoded;
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(403).json({ message: "Unauthorized" });
    }
  }
);

export default verifyToken;
