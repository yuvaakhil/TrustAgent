const express = require("express");
const router = express.Router();

const Document = require("../models/Document");

router.post("/update-doc-type", async (req, res) => {
  try {
    const { documentId, docType } = req.body;

    if (!documentId || !docType) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await Document.findByIdAndUpdate(documentId, {
      docType: docType.toLowerCase()
    });

    res.json({ message: "Document type updated successfully" });

  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;