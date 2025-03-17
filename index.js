const express = require("express");
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
require("./db")();

const route = require("./route");

const port = process.env.PORT || 3001;

app.use("/post", route);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
