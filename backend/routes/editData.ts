import express from "express";
import verifyToken from "../middleware/authMiddleware";
import config from "../config";
import jwt from "jsonwebtoken"
import IncExp from "../models/IncExpData";

const router = express.Router()
const publicKey = config.publicKey;

type Decoded = {
    user: {
        id: string;
    }
}

router.post("/editIncExp", verifyToken, async (req, res) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(authorization, publicKey) as Decoded;
        const { user } = decoded;
        const uuid = user.id;
        const data = req.body
        if (uuid !== data.uid) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        if (data.expense > 0) {
            data.income = data.expense;
            data.expense = 0;
        }

        if (data.income < 0) {
            data.expense = data.income
            data.income = 0
        }
        if (data.expense < 0) {
            data.expense = -data.expense
        }

        await IncExp.findOneAndUpdate({ txnId: data.id }, data);
        return res.status(200).json({ message: "Edited" })
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" })
    }
})

export default router;