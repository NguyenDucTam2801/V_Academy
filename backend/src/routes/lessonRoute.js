const express = require('express');
const router = express.Router();
const { addLesson, addLessonToClass } = require('../controllers/lessonController');

// Route to add a new lesson
router.post('/add', async (req, res) => {
  const { lesson_topic, tutor_id, lesson_descript } = req.body;

  // Check if the necessary data is provided
  if (!lesson_topic || !tutor_id || !lesson_descript) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Add the lesson to the database
    const result = await addLesson({ lesson_topic, tutor_id, lesson_descript });
    res.status(201).json({ message: 'Lesson added successfully', data: result });
  } catch (err) {
    console.error('Error adding lesson:', err);
    res.status(500).json({ error: 'Failed to add lesson' });
  }
});

// Route to associate a lesson with a class
router.post('/add-to-class', async (req, res) => {
  const { classId, lessonId } = req.body;

  // Check if the necessary data is provided
  if (!classId || !lessonId) {
    return res.status(400).json({ error: 'Missing classId or lessonId' });
  }

  try {
    // Associate the lesson with the class
    const result = await addLessonToClass(classId, lessonId);
    res.status(201).json({ message: 'Lesson successfully added to class', data: result });
  } catch (err) {
    console.error('Error adding lesson to class:', err);
    res.status(500).json({ error: 'Failed to add lesson to class' });
  }
});

module.exports = router;
