const axios = require("axios");
const FormData = require("form-data");

const PINATA_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";

async function uploadToIPFS(fileBuffer, fileName) {
  const formData = new FormData();
  formData.append("file", fileBuffer, fileName);

  const response = await axios.post(PINATA_URL, formData, {
    headers: {
      ...formData.getHeaders(),
      Authorization: `Bearer ${process.env.PINATA_JWT}`
    }
  });

  return response.data.IpfsHash; // CID
}

module.exports = uploadToIPFS;
