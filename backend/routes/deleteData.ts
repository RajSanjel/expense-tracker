import express from "express"
import verifyToken from "../middleware/authMiddleware";
import jwt from "jsonwebtoken";
import config from "../config";
import IncExpData from "../models/IncExpData";

const router = express.Router();
const publicKey = config.publicKey

type Decoded = {
    user: {
        id: string;
    }
}

router.post("/delData", verifyToken, async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, publicKey) as Decoded;
        const { txnId, uid } = req.body;
        if (uid !== decoded.user.id) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const toDelete = await IncExpData.findOne({ txnId })
        if (!toDelete) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        await toDelete.deleteOne()
        res.status(200).json({ message: "Deleted" })
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: "Unauthorized" })
    }

})

export default router;