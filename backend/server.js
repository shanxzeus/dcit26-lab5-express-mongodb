const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Student = require('./models/Student');

dotenv.config();
const app = express();
app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => console.log('Server running'));
  })
  .catch(err => console.error('Connection failed', err));

app.get('/api/health', (req, res) => res.status(200).json({ status: 'OK' }));

app.post('/api/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Record not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

app.put('/api/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedStudent) return res.status(404).json({ error: 'Record not found' });
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ error: 'Record not found' });
    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});