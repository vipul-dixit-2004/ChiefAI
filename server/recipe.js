const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function cook(devices, ingredients, allergies, issues) {
  const prompt = `create few dishes which are heigh in protein and have low carbohydrates. I am college student who have only ${devices}. ingredients i have inculdes ${ingredients} and all spices. keep in mind i am allerygic to ${allergies} also I have these issues ${issues}.The response thus created convert the raw output text into json format {"name":name of recipe,"description":a little description,"ingredients":ingredients used in it,"instructions":instructions with serial points like in a list,"tip":extra tip}. and yes just give all text in between {} no \`\`\`json\`\`\` required `;
  result = await model.generateContent(prompt);
  //   console.log(result.response.text());
  return result.response.text();
}
module.exports = {
  cook,
};
