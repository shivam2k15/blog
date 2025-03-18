const express = require("express");
const app = express();

// This middleware function parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

//used for reading .env file
const dotenv = require("dotenv");
dotenv.config();
//connect to database
require("./db")();
const route = require("./route");
const port = process.env.PORT || 3001;

//use the route
app.use("/post", route);
//listen to the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
