const axios = require("axios");

module.exports = async function unpinFromIPFS(cid) {
  if (!cid) return;

  await axios.delete(
    `https://api.pinata.cloud/pinning/unpin/${cid}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`
      }
    }
  );
};
