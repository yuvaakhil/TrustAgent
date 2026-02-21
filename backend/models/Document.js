const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fileName: String,
  docType: {
      type: String,
      default: "unknown"
    },
  summary: String,
  ipfsCid: String,
  stellarTx: String,
  deleted: {
      type: Boolean,
      default: false
    },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Document", documentSchema);
