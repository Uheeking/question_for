const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
const PORT = process.env.PORT;
app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("Hello, Express");
});
app.use("/api", require("./api"));

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connect to database"));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(PORT, "번 포트에서 대기 중");
});

module.exports = app;
