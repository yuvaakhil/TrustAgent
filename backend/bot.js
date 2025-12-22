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

    const intent = await detectIntent(message);

    // -------------------
    // LIST DOCUMENTS
    // -------------------
    if (intent.intent === "LIST_DOCS") {
      const docs = await Document.find({ userId });

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
        docType
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

    await axios.post(
      "http://localhost:5000/api/upload",
      form,
      { headers: form.getHeaders() }
    );

    fs.unlinkSync(tempPath);

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
