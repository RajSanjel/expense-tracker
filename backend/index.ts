import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config";
import apiRoutes from "./routes/api";

const PORT = process.env.PORT || 5000;
const app: Express = express();

const allowedOrigins = [
  "https://expense-tracker-zeta-ivory.vercel.app",
  "http://localhost:5173",
  "http://localhost:4173",
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin!) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
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
app.use("/api", apiRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
