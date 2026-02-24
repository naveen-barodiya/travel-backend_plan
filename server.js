import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import travelRoutes from "./routes/travelRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ CORS for local + production
const allowedOrigins = [

    "https://travel-frontend-plan.vercel.app",
    "http://localhost:5173"
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

// ✅ Middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Server is running 🚀");
});
// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/travel", travelRoutes);

// ✅ Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
