require("dotenv").config();
const detectIntent = require("./agent/intentAgent");

(async () => {
  const result = await detectIntent("share my resume for 30 seconds");
  console.log(result);
})();
