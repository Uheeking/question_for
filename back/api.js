const express = require("express");
const QuestionItem = require("./Models/question");
const router = express.Router();

// Create a new question
router.post("/question", async (req, res) => {
  console.log("지금 들어온건가", req.body);
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
