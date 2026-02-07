import express from "express";
import { recommendTravel } from "../controllers/travelController.js";

const router = express.Router();

router.post("/recommend", recommendTravel);

export default router;
