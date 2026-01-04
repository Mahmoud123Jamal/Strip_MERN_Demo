import { Router } from "express";
import { checkoutController } from "../controllers/checkoutController";
const router = Router();

router.post("/checkout", checkoutController);

export default router;
