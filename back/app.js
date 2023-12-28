const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
app.use(bodyParser.json());
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = ["http://localhost:3000"]; // Add other allowed origins if needed
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

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


app.listen(PORT, () => {
  console.log(PORT, "번 포트에서 대기 중");
});

module.exports = app;
