const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose.connect(
    "mongodb+srv://devconector:devconector123@devconector-vuu2z.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  const db = mongoose.connection;
  db.on("error", (error) => console.log("connection fail", error));
  db.once("open", () => console.log("connected to database"));
};

module.exports = dbConnection;
