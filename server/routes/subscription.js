import express from "express";
import { getSubscribers, subscribe, update, deleteSubscriber } from "../controllers/subscription.controller.js";

const router = express.Router();

router.get('/', getSubscribers);

router.post('/subscribe', subscribe);

router.patch('/update/:id', update);

router.delete('/remove/:id', deleteSubscriber);

export { router as subscriptionRoutes };
