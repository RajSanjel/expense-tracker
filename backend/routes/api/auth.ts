import { Router } from "express";
import AuthController from "../../app/Http/Controllers/AuthController";

const router: Router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/user", AuthController.user);

export default router;
