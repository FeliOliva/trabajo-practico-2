const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connection;
