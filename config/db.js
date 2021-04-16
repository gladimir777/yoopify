const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = () => {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", (error) => console.log("connection fail", error));
  db.once("open", () => console.log("connected to database"));
};

module.exports = dbConnection;
