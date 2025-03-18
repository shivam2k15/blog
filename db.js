const mongoose = require("mongoose");

// Connect to MongoDB
// This function connects to MongoDB using the MONGODB_URI from the .env file.
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log("connected");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
