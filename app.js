const express = require('express');
const mongoose = require('mongoose');
const mentorRoutes = require('./routes/mentors');
const studentRoutes = require('./routes/students');

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://dhatchan0:sVxQSR89k0LjWLi5@dhatchan0.d8bmi.mongodb.net/assign_mentor?retryWrites=true&w=majority&appName=dhatchan0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(error => console.error('MongoDB connection error:', error));

// Routes
app.use('/mentors', mentorRoutes);
app.use('/students', studentRoutes);

module.exports = app;
