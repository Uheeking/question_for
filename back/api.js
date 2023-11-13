const express = require("express");
const QuestionItem = require("./Models/question");
const router = express.Router();

// Create a new question
router.post("/question", async (req, res) => {
  console.log('지금 들어온건가',req.body);
  try {
    const question = new QuestionItem(req.body);
    const savedQuestion = await question.save();
    res.json(savedQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Could not create a new question.' });
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

// Delete a question item
router.delete("/question/:id", async (req, res) => {
  await QuestionItem.deleteOne({ _id: req.params.id });
  res.json({ message: "question deleted." });
});

module.exports = router;
