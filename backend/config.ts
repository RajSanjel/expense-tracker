import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const privateKey = fs.readFileSync("./private.key", "utf8");
const publicKey = fs.readFileSync("./public.key", "utf8");

export default {
  mongoURI: process.env.MONGODB_URI || "",
  publicKey,
  privateKey,
};
