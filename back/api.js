const express = require("express");
const session = require("express-session");
const QuestionItem = require("./Models/question");
const UserItem = require("./Models/user");
const router = express.Router();
const axios = require("axios");
const qs = require("qs");
require("dotenv").config();

router.use(
  session({
    secret: process.env.SERCETKEY, // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
  })
);

// Create a new question
router.post("/question", async (req, res) => {
  try {
    const question = new QuestionItem(req.body);
    const savedQuestion = await question.save();
    res.json(savedQuestion);
  } catch (error) {
    res.status(500).json({ error: "Could not create a new question." });
  }
});

// Fetch all question
router.get("/question", async (req, res) => {
  try {
    const question = await QuestionItem.find();
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve question." });
  }
});

const axiosInstance = axios.create({
  headers: {
    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  },
});

router.get("/oauth/callback/kakao", async (req, res) => {
  try {
    const { CLIENT_ID, REDIRECT_URI } = process.env;
    const { code } = req.query;

    const token = await axiosInstance.post(
      "https://kauth.kakao.com/oauth/token",
      qs.stringify({
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        code,
      })
    );

    const user = await axiosInstance.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${token.data.access_token}`,
      },
    });
    console.log("data::", user.data);

    const {
      id,
      kakao_account: {
        profile: { nickname },
      },
    } = user.data;

    const existingUser = await UserItem.findOne({ _id: id });

    if (existingUser) {
      req.session.userId = existingUser.id;
      req.session.save(() => {});
    } else {
      const userItem = new UserItem({
        _id: id,
        name: nickname,
      });
      const savedUser = await userItem.save();
      res.json(savedUser);
    }

    req.session.userData = {
      _id: id,
      name: nickname,
    };

    return res.redirect("http://localhost:3000");
  } catch (error) {
    console.error("Error in Kakao OAuth callback:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/question/:id", async (req, res) => {
  try {
    const question = await QuestionItem.find();
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve question." });
  }
});

// Add a question item
router.post("/question/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.body;
    const existingQuestion = await QuestionItem.findOne({ _id: id });

    if (existingQuestion) {
      await QuestionItem.updateOne({ _id: id }, { answer });
      res.json({ message: "Question updated successfully." });
    }
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a question item
router.delete("/question/:id", async (req, res) => {
  await QuestionItem.deleteOne({ _id: req.params.id });
  res.json({ message: "question deleted." });
});

module.exports = router;
