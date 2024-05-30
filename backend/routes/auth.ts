import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import fs from "fs";
// import config from "../config";

const router = express.Router();

// Read RSA private key from file
const privateKey = fs.readFileSync("private.pem");

// Read RSA public key from file
// const publicKey = fs.readFileSync("public.pem");

// Utility function to generate JWT using RSA key pair

const generateToken = (user: {
  userid: string;
}) => {
  const payload = {
    user: {
      id: user.userid
    },
  };
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      privateKey, // Use private key for signing
      { expiresIn: 30600, algorithm: "RS512" },
      (err, token) => {
        if (err) reject(err);
        resolve(token as string);
      }
    );
  });
};

// Register Route
router.post("/register", async (req, res) => {
  const { email, username, password, displayName } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = new User({ email, username, password, displayName });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    return res.status(201).json({ message: "Registered" });
  } catch (err) {
    console.error((err as Error).message);
    return res.status(500).send("Server Error");
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("here")
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = await generateToken(user);
    return res.json({ token });
  } catch (err) {
    console.error((err as Error).message);
    return res.status(500).send("Server Error");
  }
});

export default router;
