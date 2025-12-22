function validateDocType(text, aiDocType) {
  const t = text.toLowerCase();

  // Aadhaar MUST contain 12-digit number pattern
  if (aiDocType === "aadhaar" && /\b\d{4}\s\d{4}\s\d{4}\b/.test(t)) {
    return "aadhaar";
  }

  // Resume must contain professional keywords
  if (
    aiDocType === "resume" &&
    (t.includes("education") || t.includes("experience"))
  ) {
    return "resume";
  }

  // PAN card validation
  if (
    aiDocType === "pan" &&
    /\b[A-Z]{5}[0-9]{4}[A-Z]\b/.test(text)
  ) {
    return "pan";
  }

  // Certificates
  if (aiDocType === "certificate") {
    return "certificate";
  }

  return "unknown";
}

module.exports = validateDocType;
