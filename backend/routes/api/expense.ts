import { Router } from "express";
import verifyToken from "../../app/Http/Middleware/authMiddleware";
import ExpenseController from "../../app/Http/Controllers/ExpenseController";

const router: Router = Router();

router.get("/get", verifyToken, ExpenseController.getExpense);
router.post("/add", verifyToken, ExpenseController.addExpense);

export default router;
