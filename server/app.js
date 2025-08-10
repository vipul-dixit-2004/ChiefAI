require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const { connectToDb } = require("./connectDb");
const userRoute = require('./router/user');
const recipeRoute = require('./router/recipe')
const cookieParser = require("cookie-parser");

const app = express();
connectToDb();
//configure
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://chief-ai-ten.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use("/user", userRoute);//routes for user
app.use("/recipe", recipeRoute);



app.get("/", (req, res) => {
  res.json({ status: true });
});

app.listen(PORT, () => console.log("The server is up and running", PORT));
