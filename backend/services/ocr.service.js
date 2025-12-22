const Tesseract = require("tesseract.js");

async function extractText(buffer) {
  const result = await Tesseract.recognize(buffer, "eng");
  return result.data.text;
}

module.exports = extractText;

const pdfParse = require("pdf-parse");

async function extractText(buffer, mimeType) {
  // PDF
  if (mimeType === "application/pdf") {
    const data = await pdfParse(buffer);
    return data.text;
  }

  // Image
  const result = await Tesseract.recognize(buffer, "eng");
  return result.data.text;
}

module.exports = extractText;
