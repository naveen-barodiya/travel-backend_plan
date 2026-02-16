
import app from "./app.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import "dotenv/config";

dotenv.config();
connectDB();

// const app = express();





app.use(
    cors({
        origin: "https://travel-frontend-plan.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    res.json({ message: "Travel API endpoint" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
