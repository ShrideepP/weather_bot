import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { getSubscribers, subscribe, update, deleteSubscriber } from "../controllers/subscription.controller.js";

const router = express.Router();

router.get('/', getSubscribers);

router.post('/subscribe', verifyToken, subscribe);

router.patch('/update/:id', verifyToken, update);

router.delete('/remove/:id', verifyToken, deleteSubscriber);

export { router as subscriptionRoutes };
