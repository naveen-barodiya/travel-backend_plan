import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import travelRoutes from "./routes/travelRoutes.js";
import dotenv from "dotenv";
dotenv.config(); // 🔑 MUST be first

const app = express();

// DB connect ONCE
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/travel", travelRoutes);

export default app;
