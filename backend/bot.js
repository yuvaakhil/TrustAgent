require("dotenv").config();

const { Telegraf } = require("telegraf");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

const connectDB = require("./db/mongo");
const detectIntent = require("./agent/intentAgent");
const Document = require("./models/Document");

connectDB();

// =======================
// CREATE BOT
// =======================
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
// Store documents waiting for manual naming
const pendingDocs = {};
// =======================
// /start
// =======================
bot.start((ctx) => {
  ctx.reply(
    "👋 Hi! I’m TrustAgent.\n\n" +
    "You can:\n" +
    "• Upload a document\n" +
    "• Say: show my documents\n" +
    "• Say: share my resume for 30 seconds"
  );
});

// =======================
// TEXT (AGENTIC AI)
// =======================
bot.on("text", async (ctx) => {
  try {
    const message = ctx.message.text;
    const userId = `telegram_${ctx.from.id}`;
    // If user is naming an unknown document
if (pendingDocs[userId]) {
  const documentId = pendingDocs[userId];

  await axios.post("http://localhost:5000/api/update-doc-type", {
    documentId,
    docType: message.toLowerCase()
  });

  delete pendingDocs[userId];

  return ctx.reply(
    `✅ Document saved as ${message.toUpperCase()} successfully.`
  );
}

    const intent = await detectIntent(message);

    // -------------------
    // LIST DOCUMENTS
    // -------------------
    if (intent.intent === "LIST_DOCS") {
      const docs = await Document.find({ userId, deleted: false });


      if (!docs.length) {
        return ctx.reply("📭 You have no documents yet.");
      }

      const list = docs
        .map((d, i) => `${i + 1}. ${d.docType.toUpperCase()}`)
        .join("\n");

      return ctx.reply(`📄 Your documents:\n${list}`);
    }

    // -------------------
    // SHARE DOCUMENT
    // -------------------
    if (intent.intent === "SHARE_DOCUMENT") {
      const { docType, expirySeconds } = intent;

      const doc = await Document.findOne({
  userId,
  deleted: false,
  docType: { $regex: docType, $options: "i" }
});


      if (!doc) {
        return ctx.reply(`❌ I couldn't find your ${docType}.`);
      }

      const response = await axios.post(
        "http://localhost:5000/api/share",
        {
          documentId: doc._id,
          seconds: expirySeconds || 30
        }
      );

      return ctx.reply(
  `🔐 <b>Secure link</b> (valid for ${expirySeconds || 30}s):\n\n` +
  `<a href="${response.data.shareLink}">${response.data.shareLink}</a>`,
  {
    parse_mode: "HTML",
    disable_web_page_preview: true
  }
);

    }

// DELETE DOCUMENT
if (intent.intent === "DELETE_DOCUMENT") {
  const { docType } = intent;
  const userId = `telegram_${ctx.from.id}`;

  const doc = await Document.findOne({
    userId,
    docType: { $regex: docType, $options: "i" }
  });

  if (!doc) {
    return ctx.reply(`❌ I couldn't find your ${docType}.`);
  }

  await axios.post("http://localhost:5000/api/delete", {
    documentId: doc._id,
    userId
  });

  return ctx.reply(`🗑️ ${docType.toUpperCase()} deleted successfully.`);
}



    // -------------------
    // FALLBACK
    // -------------------
    ctx.reply("🤔 I didn’t understand that.");

  } catch (err) {
    console.error("Bot text error:", err);
    ctx.reply("⚠️ Something went wrong.");
  }
});

// =======================
// DOCUMENT UPLOAD
// =======================
bot.on("document", async (ctx) => {
  try {
    const userId = `telegram_${ctx.from.id}`;
    const file = ctx.message.document;

    const fileLink = await ctx.telegram.getFileLink(file.file_id);

    // temp storage
    const tempDir = path.join(__dirname, "temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const tempPath = path.join(tempDir, file.file_name);

    // download file
    const response = await axios.get(fileLink.href, {
      responseType: "stream"
    });

    await new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(tempPath);
      response.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    // send to backend
    const form = new FormData();
    form.append("file", fs.createReadStream(tempPath));
    form.append("userId", userId);

   const uploadRes = await axios.post(
      "http://localhost:5000/api/upload",
      form,
      { headers: form.getHeaders() }
    );

    fs.unlinkSync(tempPath);
    const { documentId, docType } = uploadRes.data;

    // If AI detected properly
if (docType && docType !== "unknown") {
  return ctx.reply(
    `✅ ${docType.toUpperCase()} detected and stored securely.`
  );
}

// If AI failed → ask user
pendingDocs[userId] = documentId;

return ctx.reply(
  "🤔 I couldn't identify this document.\n" +
  "Please tell me the document name."
);

    ctx.reply("✅ Document uploaded and stored securely.");

  } catch (err) {
    console.error("Bot upload error:", err);
    ctx.reply("❌ Upload failed.");
  }
});

// =======================
// START BOT
// =======================
bot.launch();
console.log("🤖 Telegram bot running...");
