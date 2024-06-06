import express, { Express } from "express";
import AuthRoute from "./api/auth";
import ExpenseRoute from "./api/expense";

// ? Why is this variable named api? make it easier to read :)
const api: Express = express();

api.use("/auth", AuthRoute);
api.use("/expense", ExpenseRoute);

export default api;
