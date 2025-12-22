const express = require("express");
const Document = require("../models/Document");
const router = express.Router();

router.get("/my-docs/:userId", async (req, res) => {
  const docs = await Document.find({ userId: req.params.userId });
  res.json(docs);
});

module.exports = router;
