const express = require("express");
const multer = require("multer");
const path = require("path");
const User = require("./models/User");
const app = express();

const connection = require("./config/db");

app.use(express.json());

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

app.post("/auth/signup", async (req, res) => {
  const { userName, email, password } = req.body;
  const user = new User({ userName, email, password });
  try {
    const savedUser = await user.save();
    return res.status(200).json(savedUser);
  } catch (error) {
    return res.json({ error: "fail to save user" }).status(500);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server listening on port " + PORT));
