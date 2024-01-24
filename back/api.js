const express = require("express");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const QuestionItem = require("./Models/question");
const UserItem = require("./Models/user");
const LikeItem = require("./Models/like");
const router = express.Router();
const axios = require("axios");
const qs = require("qs");
require("dotenv").config();

const maxAge = 1000 * 60 * 60;
router.use(
  session({
    secret: process.env.SERCETKEY, // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({ checkPeriod: maxAge }),
    cookie: {
      maxAge,
    },
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

    const {
      id,
      kakao_account: {
        profile: { nickname },
      },
    } = user.data;
    const existingUser = await UserItem.findOne({ _id: id });

    if (!existingUser) {
      const userItem = new UserItem({
        _id: id,
        name: nickname,
      });
      await userItem.save();
    }
    req.session.userData = {
      _id: id,
      name: nickname,
    };

    return res.redirect("http://localhost:3000/?id=" + nickname);
  } catch (error) {
    console.error("Error in Kakao OAuth callback:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/deleteUser", async (req, res) => {
  try {
    req.session.destroy(() => {
      req.session;
    });
    res.status(200).json({ message: "로그아웃 되었습니다. " });
  } catch (error) {
    console.error("Error in Delete User :", error.message);
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

router.get("/check-session", (req, res) => {
  console.log("백엔드 돌아가는 중");
  console.log(req.session.userData);

  if (req.session.userData) {
    res.json({ authenticated: true, userId: req.session.userData });
  } else {
    res.json({ authenticated: false });
  }
});

router.post("/like/:id", async (req, res) => {
  try {
    console.log("백엔드 돌아가는 중");

    const { id } = req.params;
    const { isLiked } = req.body;
    console.log(id, isLiked);
    const existingLike = await LikeItem.findOne({ _id: id });

    if (existingLike) {
      await LikeItem.deleteOne({ _id: id });
      console.log("삭제되었습니다. ");
      res.json({
        _id: id,
        like: isLiked,
        message: "LikeItem deleted successfully.",
      });
    } else {
      const newLike = new LikeItem({ _id: id, like: isLiked });
      const savedLike = await newLike.save();
      console.log(newLike);
      res.json(savedLike);
    }
  } catch (error) {
    console.error("Error adding like:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/like", async (req, res) => {
  try {
    const like = await LikeItem.find();
    res.json(like);
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve like." });
  }
});

module.exports = router;
