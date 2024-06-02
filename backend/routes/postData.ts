import express from "express";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/authMiddleware";
import fs from "fs";
import IncExp from "../models/IncExpData";
const router = express.Router();

type Decoded = {
  user: {
    id: string;
  }
}

router.post("/incExp", verifyToken, async (req, res) => {
  const token = req.headers.authorization;
  const { date, income, expense, title } = req.body
  const publicKey = fs.readFileSync("public.pem");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  try {
    const decoded = jwt.verify(token, publicKey) as Decoded;
    const { id } = decoded.user
    const toSaveData = new IncExp({ userid: id, date, expense: Math.abs(expense), income, title })
    await toSaveData.save()
    return res.status(201).json({ message: "Saved" });
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: "Unauthorizd" })
  }

});

export default router;
