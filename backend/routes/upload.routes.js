const express = require("express");
const multer = require("multer");

const uploadToIPFS = require("../services/ipfs.service");
const anchorToBlockchain = require("../services/stellar.service");

const extractText = require("../services/ocr.service");
const classifyDocument = require("../services/classify.service");
const validateDocType = require("../utils/validateDocType");

const Document = require("../models/Document");

const router = express.Router();
const upload = multer(); // memory storage

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { userId } = req.body;

    // 1️⃣ Basic validation
    if (!req.file || !userId) {
      return res.status(400).json({
        error: "file and userId required"
      });
    }

    // 2️⃣ Extract text (OCR / PDF)
    const extractedText = await extractText(
      req.file.buffer,
      req.file.mimetype
    );

    // 3️⃣ AI classification
    const aiDocType = await classifyDocument(extractedText);

    // 4️⃣ Rule-based validation (FINAL reliable type)
    const finalDocType = validateDocType(extractedText, aiDocType);

    // 5️⃣ Upload file to IPFS
    const cid = await uploadToIPFS(
      req.file.buffer,
      req.file.originalname
    );

    // 6️⃣ Anchor CID to Stellar blockchain
    const txHash = await anchorToBlockchain(cid);

    // 7️⃣ Save document metadata
    const doc = await Document.create({
      userId,
      fileName: req.file.originalname,
      ipfsCid: cid,
      docType: finalDocType, // ✅ CONTENT-BASED
      stellarTx: txHash
    });

    // 8️⃣ Response
    res.json({
      message: "Uploaded successfully",
      documentId: doc._id,
      docType: finalDocType,
      cid
    });

  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({
      error: "Upload failed"
    });
  }
});

module.exports = router;
