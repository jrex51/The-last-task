const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const usersRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 5000;

mongoose.connect(
  "mongodb://jrex51:wildrex97@ds127624.mlab.com:27624/outerheaven",
  { useNewUrlParser: true }
);

mongoose.connection.on("connected", () => {
  console.log("\x1b[36m%s\x1b[0m", "mongo has been connected...");
});

app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use("/api/user", usersRoutes);
app.use("/api/post", postRoutes);

app.get("/", (req, res) => {
  const token = jwt.sign({ name: "Murtada", age: 21 }, "yaikes");
  res.send(token);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
