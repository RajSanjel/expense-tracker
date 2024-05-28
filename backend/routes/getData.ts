import express from "express";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/authMiddleware";
import fs from "fs";
import Users from "../models/User";
const router = express.Router();

router.get("/user", verifyToken, async (req, res) => {
  console.log("Hi");
  const { authorization } = req.body;
  const token = authorization;
  const publicKey = fs.readFileSync("public.pem");
  try {
    const decoded = jwt.verify(token, publicKey) as { user: { id: string } };
    const { user } = decoded;
    const id = user.id;
    console.log(id);
    const userdata = await Users.findOne({ userid: id });
    if (!userdata) {
      return res.json({ error: "no user found" });
    }
    const returnUser = {
      userId: userdata.id,
      displayName: userdata.displayName,
      email: userdata.email,
      username: userdata.username,
    };
    res.json(returnUser);
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(403).json({ message: "Unauthorized" });
  }
});

export default router;
