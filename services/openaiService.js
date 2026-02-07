import openai from "../config/openai.js";

export const getAIResponse = async (prompt) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [
            {
                role: "system",
                content:
                    "You are a professional travel consultant. Respond ONLY in valid JSON. No extra text.",
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        // temperature: 0.6,
        max_tokens: 700,   // ✅ OUTPUT LIMIT
    });

    return completion.choices[0].message.content;
};
