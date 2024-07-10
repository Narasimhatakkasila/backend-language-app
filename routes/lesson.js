const express = require('express');
const Lesson = require('../models/Lesson');
const multer = require('multer');
const router = express.Router();

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new Lesson with an image
router.post('/create', upload.single('image'), async (req, res) => {
    try {
        console.error("req.body");
        console.error(req.body);
        console.error("req.body");
        const { title, description, link } = req.body;
        const image = req.file.buffer.toString('base64'); // Convert image buffer to base64

        const newLesson = new Lesson({
            title,
            link,
            image,
            description
        });
        console.error(newLesson);
        await newLesson.save();
        res.status(201).json(newLesson);
    } catch (error) {
        res.status(500).json({ error: 'Unable to Create a Lesson',error });
    }
});

// Get All Lessons
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (error) {
    res.status(500).send('Error fetching lessons');
  }
});

// Get Lesson by ID
router.get('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).send('Lesson not found');
    res.json(lesson);
  } catch (error) {
    res.status(500).send('Error fetching lesson');
  }
});

// Update Lesson
router.put('/:id', async (req, res) => {
  const { title, description, link,image } = req.body;
  console.log(req.body);
  console.log({ title, description, link, image });
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, { title, description, link, image }, { new: true });
    if (!lesson) return res.status(404).send('Lesson not found');
    res.json(lesson);
  } catch (error) {
    res.status(500).send('Error updating lesson');
  }
});

// Delete Lesson
router.delete('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).send('Lesson not found');
    res.send('Lesson deleted');
  } catch (error) {
    res.status(500).send('Error deleting lesson');
  }
});

module.exports = router;
