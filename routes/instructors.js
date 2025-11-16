import express from 'express';
import Instructor from '../models/Instructor.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all instructors
router.get('/', async (req, res) => {
  try {
    const instructors = await Instructor.find().sort({ createdAt: -1 });
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single instructor
router.get('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }
    res.json(instructor);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create instructor (Admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const instructor = new Instructor(req.body);
    await instructor.save();
    res.status(201).json(instructor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update instructor (Admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }
    res.json(instructor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete instructor (Admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }
    res.json({ message: 'Instructor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

