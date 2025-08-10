const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// Note: It's recommended to use the latest models like gemini-1.5-flash
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function cook(
  devices,
  ingredients,
  allAllergies,
  issues,
  gender,
  intolerances,
  dietary_preference
) {
  const prompt = `
You are a culinary AI assistant. Generate a list of **creative, healthy, and realistic recipes**.

Context about the user:
- Cooking equipment available: ${devices || "basic utensils only"}
- Ingredients available: ${ingredients} and all common spices
- Gender: ${gender}
- Dietary preference: ${dietary_preference}
- Allergies: ${allAllergies.length ? allAllergies : "None"}
- Intolerances: ${intolerances.length ? intolerances : "None"}
- Health issues or dietary restrictions: ${issues.length ? issues : "None"}
if user is vegetarian then there should be no egg at all.
Recipe requirements:
1. Recipes must be **high in protein** and **low in carbohydrates**.
2. Only use available equipment and ingredients listed.
3. Avoid all allergens and intolerances mentioned.
4. Each recipe must include:
   - "name" (string)
   - "description" (short string)
   - "ingredients" (array of Strings) with measurements
   - "instructions" (array of short, clear steps)
   - "tip" (string, optional)
   - "type" (string: "veg", "non-veg", or "contains egg")

Output format:
- Return ONLY a pure JSON array (no markdown, no extra text, no explanations)
- Example format:
[
  {
    "name": ".....",
    "description": "........",
    "ingredients": [......,.....,.....,.....],
    "instructions": [......,......,......,.....,...],
    "tip": "",
    "type": "veg/non-veg/contains egg"
  }
]
`;

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