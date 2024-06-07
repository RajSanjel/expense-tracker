import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config";
import authRoutes from "./routes/auth";
import getDataRoutes from "./routes/getData";
import postDataRoutes from "./routes/postData";
import editData from "./routes/editData";
import deleteData from "./routes/deleteData";

const app = express();

const allowedOrigins = [
  'https://expense-tracker-zeta-ivory.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173'
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin!) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
};

// Middleware
app.use("*", cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json("Deployed!");
});



app.use("/api/auth", authRoutes);
app.use("/api/get", getDataRoutes);
app.use("/api/post", postDataRoutes);
app.use("/api/edit", editData)
app.use("/api/delete", deleteData)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
