const axios = require("axios");

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

async function detectIntent(message) {
  const response = await axios.post(
    GROQ_URL,
    {
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are an intent detection agent.
Return ONLY valid JSON. No text.

Possible intents:
- LIST_DOCS
- SHARE_DOCUMENT
- UNKNOWN

If sharing, extract:
- docType (resume, aadhaar, certificate, pan, etc.)
- expirySeconds (number)

If listing, just return intent.
`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return JSON.parse(response.data.choices[0].message.content);
}

module.exports = detectIntent;
