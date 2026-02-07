import OpenAI from "openai";

import dotenv from "dotenv";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

console.log("🔑 OpenAI Key Loaded:", process.env.OPENAI_API_KEY);

if (!OPENAI_API_KEY) {
    throw new Error("❌ OpenAI API Key missing");
}

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

export default openai;
