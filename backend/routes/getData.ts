import express from "express";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/authMiddleware";
import Users from "../models/User";
import IncExpData from "../models/IncExpData";
import config from "../config";
const router = express.Router();

type Decoded = {
  user: {
    id: string
  }
}

type IncExpData = {
  id: string,
  income: number,
  expense: number,
  title: string
}
const publicKey = config.publicKey

router.get("/user", verifyToken, async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  try {
    const decoded = jwt.verify(token, publicKey) as Decoded;
    const { user } = decoded;
    const id = user.id;
    const userdata = await Users.findOne({ userid: id });
    if (!userdata) {
      return res.json({ error: "No user found" });
    }
    const returnUser = {
      userId: userdata.id,
      displayName: userdata.displayName,
      email: userdata.email,
      username: userdata.username,
    };
    res.status(200).json(returnUser);
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(403).json({ message: "Unauthorized" });
  }
});


router.get("/dash", verifyToken, async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  try {
    const decoded = jwt.verify(token, publicKey) as Decoded;
    const { user } = decoded;
    const id = user.id;
    const incExpData = await IncExpData.find({ userid: id });
    if (!incExpData) {
      return res.json({ message: "No Data Found" });
    }
    if (incExpData.length === 0) {
      return res.json({ message: "No Data Found" });
    }
    const returnData = incExpData.map(data => ({
      uid: data.userid,
      id: data.txnId,
      income: data.income,
      expense: data.expense,
      title: data.title,
      date: data.date
    }));
    return res.status(200).json(returnData)
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized" })
  }
})


export default router;