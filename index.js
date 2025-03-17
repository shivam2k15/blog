const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Blog!");
});

app.post("/", (req, res) => {
  res.send("Created Blog!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
