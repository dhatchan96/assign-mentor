const express = require('express');
const Student = require('../models/Student');
const Mentor = require('../models/Mentor');

const router = express.Router();

// 2. Create Student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 4. Assign or change mentor for a student
router.put('/:studentId/assign-mentor', async (req, res) => {
  const { studentId } = req.params;
  const { mentorId } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Save the previous mentor if exists
    if (student.mentor) {
      student.previousMentors.push(student.mentor);
    }

    // Update mentor
    student.mentor = mentorId;
    await student.save();

    // Update the mentor's students list
    const mentor = await Mentor.findById(mentorId);
    if (mentor && !mentor.students.includes(student._id)) {
      mentor.students.push(student._id);
      await mentor.save();
    }

    res.json({ message: 'Mentor assigned to student', student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 6. Show previously assigned mentors for a student
router.get('/:studentId/previous-mentors', async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findById(studentId).populate('previousMentors');
    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.json(student.previousMentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
