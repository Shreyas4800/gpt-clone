import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateContent(contents) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
  });
    return response.text;
}


module.exports = {
    generateContent
};