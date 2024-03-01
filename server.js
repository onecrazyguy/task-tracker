const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db'); // Make sure this path matches your db.js file location
const Task = require('./models/Task'); // Update this path to where your Task model is located

// Initialize express app
const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.static('public')); // Serve static files from public directory

// Routes
// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add a new task
app.post('/tasks', async (req, res) => {
  try {
    const task = new Task({ description: req.body.description });
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { description: req.body.description }, { new: true });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Task tracker app listening at http://localhost:${port}`);
});
