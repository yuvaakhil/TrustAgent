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
Return ONLY valid JSON. No extra text.

Possible intents:
- LIST_DOCS
- SHARE_DOCUMENT
- DELETE_DOCUMENT
- UNKNOWN

Rules:
1. If user asks to list/show documents → LIST_DOCS
2. If user asks to share a document → SHARE_DOCUMENT
3. If user asks to delete/remove a document → DELETE_DOCUMENT

If intent = SHARE_DOCUMENT:
Return:
{
  "intent": "SHARE_DOCUMENT",
  "docType": "resume | aadhaar | pan | certificate | unknown",
  "expirySeconds": number
}

If intent = DELETE_DOCUMENT:
Return:
{
  "intent": "DELETE_DOCUMENT",
  "docType": "resume | aadhaar | pan | certificate | unknown"
}

If intent = LIST_DOCS:
Return:
{
  "intent": "LIST_DOCS"
}

If unsure:
{
  "intent": "UNKNOWN"
}
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
