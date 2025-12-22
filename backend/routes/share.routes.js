const express = require("express");
const { v4: uuidv4 } = require("uuid");
const ShareToken = require("../models/ShareToken");
const Document = require("../models/Document");

const router = express.Router();

router.post("/share", async (req, res) => {
  try {
    const { documentId, seconds } = req.body;

    // ✅ Correct validation
    if (!documentId || !seconds) {
      return res
        .status(400)
        .json({ error: "documentId and seconds required" });
    }

    // ✅ Find document
    const doc = await Document.findById(documentId);
    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }

    // ✅ Create expiring token
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + Number(seconds) * 1000);

    await ShareToken.create({
      token,
      documentId: doc._id,
      expiresAt
    });

    // ✅ Use BASE_URL (localhost now, prod later)
    const baseUrl = process.env.BASE_URL || "http://localhost:5000";

    res.json({
      shareLink: `${baseUrl}/view/${token}`,
      expiresAt
    });

  } catch (err) {
    console.error("Share error:", err);
    res.status(500).json({ error: "Failed to create share link" });
  }
});

module.exports = router;
