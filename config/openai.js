import OpenAI from "openai";

const OPENAI_API_KEY =" process.env.OPENAI_API_KEY";

if (!OPENAI_API_KEY) {
    throw new Error("❌ OpenAI API Key missing");
}

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

export default openai;
