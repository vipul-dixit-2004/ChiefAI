require("dotenv").config();
const express = require("express");
const controller = require("./Controllers/control");
const app = express();
const PORT = process.env.PORT | 3000;

app.get("/api", (req, res) => {
  res.json({ status: true });
});
app.post("/api/cook", controller.recipes);

app.listen(PORT, () => console.log("The server is up and running"));
