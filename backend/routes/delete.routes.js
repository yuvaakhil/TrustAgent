const express = require("express");
const Document = require("../models/Document");

const router = express.Router();

router.post("/delete", async (req, res) => {
  try {
    console.log("DELETE BODY:", req.body);

    const { documentId, userId } = req.body;

    if (!documentId || !userId) {
      return res.status(400).json({
        error: "documentId and userId required"
      });
    }

    const doc = await Document.findOne({
      _id: documentId,
      userId,
      deleted: false
    });

    if (!doc) {
      return res.status(404).json({
        error: "Document not found or already deleted"
      });
    }

    doc.deleted = true;
    await doc.save();

    return res.json({
      message: "Document removed from your list",
      fileName: doc.fileName,
      docType: doc.docType
    });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    return res.status(500).json({
      error: "Delete failed"
    });
  }
});

module.exports = router;
