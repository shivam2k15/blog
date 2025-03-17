const mongoose = require("mongoose");

async function dbConnect() {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("connected");
      });
  } catch (error) {
    console.log(error);
  }
}

module.exports = dbConnect;
