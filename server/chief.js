const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// Note: It's recommended to use the latest models like gemini-1.5-flash
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function cook(devices, ingredients, allergies, issues) {
  const prompt = `create few dishes which are high in protein and have low carbohydrates. I am a college student who has only ${devices}. Ingredients I have include ${ingredients} and all spices. Keep in mind I am allergic to ${allergies} and also I have these issues: ${issues}. The response should be in pure JSON format: [{"name": "...", "description": "...", "ingredients": [...], "instructions": [...], "tip": "..."}]. No \`\`\`json\`\`\` or any markdown formatting — just pure JSON array inside square brackets.`;

  try {
    const result = await model.generateContent(prompt);
    const rawText = await result.response.text();

    // Find the start and end of the JSON array
    const startIndex = rawText.indexOf('[');
    const endIndex = rawText.lastIndexOf(']');


    // Extract the JSON string
    const jsonString = rawText.substring(startIndex, endIndex + 1);

    // Parse the extracted string
    const jsonArray = JSON.parse(jsonString);
    return jsonArray;

  } catch (err) {
    console.error("An error occurred:", err);
    if (result) {
      console.log("Raw text that caused the error:", await result.response.text());
    }
    return null;
  }
}

module.exports = {
  cook,
};