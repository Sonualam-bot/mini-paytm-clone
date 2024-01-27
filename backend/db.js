const mongoose = require("mongoose");

const connectDatabase = () => {
  // Use mongoose to connect
  mongoose
    .connect(process.env.CONNECTION_URL, {
      dbName: "paytm--clone",
    })
    .then((data) => {
      console.log(`Connected to MongoDB server: ${data.connection.host}`);
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = connectDatabase;
