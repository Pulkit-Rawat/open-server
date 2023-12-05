const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const getPromptRes = async (content) => {
  try {
    const params = {
      messages: [{ role: "user", content: content || "introduce" }],
      model: "gpt-3.5-turbo",
    };
    const chatCompletion = await openai.chat.completions.create(params);
    return chatCompletion.choices[0].message.content;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getPromptRes };
