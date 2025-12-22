require("dotenv").config(); // MUST be first

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/mongo");

const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// ROUTES (⬅️ MUST BE BEFORE app.listen)
app.use("/api", require("./routes/test.routes"));
app.use("/api", require("./routes/upload.routes"));
app.use("/api", require("./routes/share.routes"));
app.use("/", require("./routes/view.routes"));

// Health check
app.get("/", (req, res) => {
  res.send("TrustAgent backend running");
});

// Start server (⬅️ ALWAYS LAST)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
