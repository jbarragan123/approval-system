import express from "express";
import { getNotifications } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/:user", getNotifications);

export default router;
