const OpenAI = require("openai")
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const openAI = async (search) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: search }],
    model: "gpt-3.5-turbo",
  })

  return chatCompletion.choices
}

module.exports = { openAI }
