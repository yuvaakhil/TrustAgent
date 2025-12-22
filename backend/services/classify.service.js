async function classifyDocument(text) {
  const t = text.toLowerCase();

  if (t.includes("unique identification authority") || t.includes("aadhaar")) {
    return "aadhaar";
  }

  if (
    t.includes("curriculum vitae") ||
    t.includes("resume") ||
    t.includes("skills") ||
    t.includes("experience")
  ) {
    return "resume";
  }

  if (
    t.includes("income tax department") ||
    t.includes("permanent account number")
  ) {
    return "pan";
  }

  if (t.includes("certificate")) {
    return "certificate";
  }

  return "unknown";
}

module.exports = classifyDocument;
