const express = require('express');
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');

const router = express.Router();

// 1. Create Mentor
router.post('/', async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json(mentor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 3. Assign multiple students to a mentor
router.post('/:mentorId/assign-students', async (req, res) => {
  const { mentorId } = req.params;
  const { studentIds } = req.body;

  try {
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

    const students = await Student.find({ _id: { $in: studentIds }, mentor: null });
    students.forEach(student => student.mentor = mentor._id);
    await Promise.all(students.map(student => student.save()));

    mentor.students.push(...students.map(student => student._id));
    await mentor.save();

    res.json({ message: 'Students assigned to mentor', mentor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 5. Show all students for a particular mentor
router.get('/:mentorId/students', async (req, res) => {
  const { mentorId } = req.params;

  try {
    const mentor = await Mentor.findById(mentorId).populate('students');
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });
    
    res.json(mentor.students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
