const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

const connection = require("./config/db");

const file_path = path.join(__dirname, "uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, file_path);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const file_surfix = `${file.fieldname}-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${ext}`;
    cb(null, file_surfix);
  },
});

connection();

const upload = multer({ storage: storage }).single("file");

app.post("/upload", upload, (req, res, next) => {
  res.send(req.file);
  next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server listening on port " + PORT));
