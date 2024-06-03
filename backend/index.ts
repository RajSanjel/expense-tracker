import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config";
import authRoutes from "./routes/auth";
import getDataRoutes from "./routes/getData";
import postDataRoutes from "./routes/postData";
const app = express();

const corsOptions = {
  origin: 'https://expense-tracker-zeta-ivory.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));


app.get("/", (req, res) => {
  res.json("Deployed!")
})
app.use("/api/auth", authRoutes);
app.use("/api/get", getDataRoutes);
app.use("/api/post", postDataRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server Started on port" + PORT));
