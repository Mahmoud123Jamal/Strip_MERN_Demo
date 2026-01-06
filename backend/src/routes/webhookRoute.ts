import { Router } from "express";
import { stripeWebhookController } from "../controllers/webhookController";
const router = Router();

router.post("/webhook", stripeWebhookController);

export default router;
