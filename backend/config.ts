import dotenv from "dotenv";
dotenv.config();

export default {
  mongoURI: process.env.MONGODB_URI || "",
  publicKey: process.env.PUBLIC_KEY || "",
  privateKey: process.env.PRIVATE_KEY || "",
};
