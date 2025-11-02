
// Import Express module
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Allow JSON and static files
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Route to get fruit list
app.get("/api/fruits", (req, res) => {
  fs.readFile("fruits.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to load fruits." });
    }
    res.json(JSON.parse(data));
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
