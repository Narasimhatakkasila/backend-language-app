const express = require('express');
const Quiz = require('../models/Quiz');
const router = express.Router();

// Create a new Quiz with an image
router.post('/create', async (req, res) => {
    try {
        console.error("req.body");
        console.error(req.body);
        console.error("req.body");
        console.error(" Test ")
        const { question, option1, option2, option3, option4, answer } = req.body;
        console.error({ question, option1, option2, option3, option4 , answer });
        const newQuiz = new Quiz({
          question,
          option1,
          option2,
          option3,
          option4,
          answer
        });
        console.error(newQuiz);
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
      console.error({ error });
        res.status(500).json({ error: 'Unable to Create a Quiz',error });
    }
});

// Get All Quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).send('Error fetching quizzes');
  }
});

// Get Quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).send('Quiz not found');
    res.json(quiz);
  } catch (error) {
    res.status(500).send('Error fetching quiz');
  }
});

// Update Quiz
router.put('/:id', async (req, res) => {
  const { question, option1, option2, option3, option4, answer } = req.body;
  console.log(req.body);
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, { question, option1, option2, option3, option4, answer}, { new: true });
    if (!quiz) return res.status(404).send('Quiz not found');
    res.json(quiz);
  } catch (error) {
    res.status(500).send('Error updating quiz');
  }
});

// Delete Quiz
router.delete('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).send('Quiz not found');
    res.send('Quiz deleted');
  } catch (error) {
    res.status(500).send('Error deleting quiz');
  }
});

module.exports = router;