import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import IncExpData from "../../../models/IncExpData";
import config from "../../../config";

const publicKey = config.publicKey || "";

const ExpenseController = {
  addExpense: async (req: Request, res: Response) => {
    try {
      const { date, income, expense, title } = req.body;
      const token = req.header("Authorization");

      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }

      const decoded = jwt.verify(token, publicKey) as JwtPayload;
      const toSaveData = new IncExpData({
        userid: decoded.id,
        date,
        expense: Math.abs(expense),
        income,
        title,
      });

      await toSaveData.save();

      return res.status(201).json({ message: "Saved" });
    } catch (error) {
      console.error((error as Error).message);
      return res.status(500).json({ msg: "Server Error" });
    }
  },
  getExpense: async (req: Request, res: Response) => {
    try {
      const token = req.header("Authorization");

      if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }

      const decoded = jwt.verify(token, publicKey) as JwtPayload;
      const incExpData = await IncExpData.find({ userid: decoded.id });

      if (!incExpData) {
        return res.json({ message: "No Data Found" });
      }

      if (incExpData.length === 0) {
        return res.json({ message: "No Data Found" });
      }

      const returnData = incExpData.map((data) => ({
        id: data.txnId,
        income: data.income,
        expense: data.expense,
        title: data.title,
        date: data.date,
      }));

      return res.status(200).json(returnData);
    } catch (error) {
      console.error((error as Error).message);
      return res.status(500).json({ msg: "Server Error" });
    }
  },
};

export default ExpenseController;
