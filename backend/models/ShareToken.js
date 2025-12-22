const mongoose = require("mongoose");

const shareTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true
  },
  expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model("ShareToken", shareTokenSchema);
