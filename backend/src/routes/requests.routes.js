import express from "express";
import {
  createRequest,
  getAllRequests,
  getRequestById,
  updateStatus,
  getRequestHistory,
} from "../controllers/requests.controller.js";

const router = express.Router();

router.post("/", createRequest);
router.get("/", getAllRequests);
router.get("/:id", getRequestById);
router.put("/:id", updateStatus);
router.get("/:id/history", getRequestHistory); 

export default router;
