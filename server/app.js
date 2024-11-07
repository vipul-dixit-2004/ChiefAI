require("dotenv").config();
const express = require("express");
const controller = require("./Controllers/control");
const PORT = process.env.PORT | 3000;
const cors = require("cors");

const app = express();

//configure
app.use(express.json());
app.use(cors());
app.get("/api", (req, res) => {
  res.json({ status: true });
});
app.post("/api/cook", controller.recipes);

app.listen(PORT, () => console.log("The server is up and running"));
