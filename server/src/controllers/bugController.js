const Bug = require('../models/bugModel');

// Get all bugs
exports.getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single bug by ID
exports.getBugById = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json(bug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new bug
exports.createBug = async (req, res) => {
  const bug = new Bug({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
  });

  try {
    const newBug = await bug.save();
    res.status(201).json(newBug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a bug by ID
exports.updateBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });

    if (req.body.title !== undefined) bug.title = req.body.title;
    if (req.body.description !== undefined) bug.description = req.body.description;
    if (req.body.status !== undefined) bug.status = req.body.status;
    if (req.body.priority !== undefined) bug.priority = req.body.priority;

    const updatedBug = await bug.save();
    res.json(updatedBug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a bug by ID
exports.deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });

    await bug.remove();
    res.json({ message: 'Bug deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
