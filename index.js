const express = require("express");
const axios = require("axios");
const { PythonShell } = require("python-shell");
const port = 4000;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Allows parsing form data

// Render index.ejs without any data
app.get("/", (req, res) => {
  res.render("index");
});

// Handle the form submission
app.post("/recommend", async (req, res) => {
  const { contentID } = req.body; // Expect contentID from the request body

  try {
    // Simulate API request to Azure ML (Replace with actual endpoint)
    const azureResponse = await axios.post(
      "https://your-azure-api-url.com",
      { contentID },
      { headers: { Authorization: "Bearer YOUR_API_KEY" } }
    );
    const azureRecommendations = azureResponse.data.recommendations;

    // Run Python script for collaborative & content filtering using contentID
    let pythonOptions = { args: [contentID] }; // Pass contentID to Python script
    PythonShell.run("predict.py", pythonOptions, (err, results) => {
      if (err) return res.status(500).send(err);

      // Parse the result from the Python script
      const recommendations = JSON.parse(results[0]);

      // Return the combined recommendations from all sources
      res.json({
        collaborative: recommendations.collaborative,
        content: recommendations.content,
        azure: azureRecommendations,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching recommendations" });
  }
});

app.listen(port, () => console.log("listening"));
