const axios = require("axios");
const FormData = require("form-data");

async function uploadToIPFS(fileBuffer, fileName) {
  const formData = new FormData();
  formData.append("file", fileBuffer, fileName);

  const response = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_KEY
      }
    }
  );

  return response.data.IpfsHash; // CID
}

module.exports = uploadToIPFS;
