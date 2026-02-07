import { buildPrompt } from "../utils/buildPrompt.js";
import { getAIResponse } from "../services/openaiService.js";
import TravelRequest from "../models/TravelRequest.js";

/**
 * Safely extract JSON from AI response
 */
function extractJSON(text) {
    try {
        const firstBrace = text.indexOf("{");
        const lastBrace = text.lastIndexOf("}");
        if (firstBrace === -1 || lastBrace === -1) return null;
        return JSON.parse(text.slice(firstBrace, lastBrace + 1));
    } catch (err) {
        return null;
    }
}

export const recommendTravel = async (req, res) => {
    try {
        const userData = req.body;

        // 1️⃣ Build prompt
        const prompt = buildPrompt(userData);

        // 2️⃣ Get AI response (OpenAI)
        const aiRaw = await getAIResponse(prompt);

        console.log("🔍 OPENAI RAW RESPONSE:\n", aiRaw);

        // 3️⃣ Extract JSON safely
        const aiData = extractJSON(aiRaw);

        if (
            !aiData?.destination ||
            !aiData?.food ||
            !aiData?.reason ||
            !Array.isArray(aiData?.highlights) ||
            !Array.isArray(aiData?.localTips)
        ) {
            return res.status(500).json({
                error: "Incomplete AI response",
                raw: aiRaw,
            });
        }

        // 4️⃣ Save to DB
        await TravelRequest.create({
            ...userData,
            aiDestination: aiData.destination,
            aiFood: aiData.food,
            aiReason: aiData.reason,
            aiActivities: aiData.activities,
            aiHighlights: aiData.highlights,
            aiLocalTips: aiData.localTips,
            aiBestTime: aiData.bestTimeToVisit,
            aiMoodMatch: aiData.travelMoodMatch,
        });

        // 5️⃣ Send response to frontend
        res.json({
            destination: aiData.destination,
            food: aiData.food,
            activities: aiData.activities,
            reason: aiData.reason,
            highlights: aiData.highlights,
            localTips: aiData.localTips,
            bestTimeToVisit: aiData.bestTimeToVisit,
            travelMoodMatch: aiData.travelMoodMatch,
        });

    } catch (err) {
        console.error("❌ Controller Error:", err);
        res.status(500).json({
            error: "Travel recommendation failed",
        });
    }
};
