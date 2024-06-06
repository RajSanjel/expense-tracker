import { Request } from "express";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../../models/User";
import config from "../../config";

const privateKey = config.privateKey || "";
const publicKey = config.publicKey || "";

export async function user(req: Request) {
  try {
    const { authorization } = req.headers;
    const token = authorization;

    if (!token) {
      return { msg: "Unauthorized" };
    }

    const decoded = jwt.verify(token, publicKey) as JwtPayload;

    const userdata = await User.findOne({ userid: decoded.id });

    if (!userdata) {
      return { msg: "No user found" };
    }

    delete userdata.password;

    return userdata;
  } catch (err) {
    console.error((err as Error).message);
    return { msg: "Server Error" };
  }
}

export async function login(req: Request) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return { msg: "Invalid credentials" };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { msg: "Invalid credentials" };
    }

    const token = jwt.sign(
      { id: user.userid }, // Ensure the payload is an object
      privateKey,
      { expiresIn: 30600, algorithm: "RS512" }
    );

    return { token };
  } catch (err) {
    console.error((err as Error).message);
    return { msg: "Server Error" };
  }
}

export async function register(req: Request) {
  try {
    const { email, username, password, displayName } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return { msg: "User already exists" };
    }

    const user = new User({ email, username, password, displayName });
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    return { message: "Registered" };
  } catch (err) {
    console.error((err as Error).message);
    return { msg: "Server Error" };
  }
}
