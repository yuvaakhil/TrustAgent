const express = require("express");
const axios = require("axios");
const ShareToken = require("../models/ShareToken");
const Document = require("../models/Document");

const router = express.Router();

router.get("/view/:token", async (req, res) => {
  try {
    const share = await ShareToken.findOne({ token: req.params.token });

    if (!share) {
      return res.status(404).send("Invalid link");
    }

    if (share.used) {
      return res.status(403).send("Link already used");
    }

    if (Date.now() > share.expiresAt.getTime()) {
      return res.status(403).send("Link expired");
    }

    const doc = await Document.findById(share.documentId);
    if (!doc) {
      return res.status(404).send("Document not found");
    }

    // Optional: mark as single-use
    // share.used = true;
    // await share.save();

    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${doc.ipfsCid}`;
    const ipfsResponse = await axios.get(ipfsUrl, { responseType: "stream" });

    res.setHeader(
      "Content-Disposition",
      `inline; filename="${doc.fileName}"`
    );

    ipfsResponse.data.pipe(res);

  } catch (err) {
    console.error(err);
    res.status(500).send("Access failed");
  }
});

module.exports = router;
