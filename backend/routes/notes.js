import express from 'express';
import Note from '../models/Note.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all notes for the authenticated user
router.get('/', async (req, res) => {
  try {
    const { folderId } = req.query;
    
    let query = { userId: req.user._id };
    
    // If folderId is provided, filter by folder
    if (folderId) {
      query.folderId = folderId === 'null' ? null : folderId;
    }
    
    const notes = await Note.find(query)
      .populate('folderId', 'name color')
      .sort({ isPinned: -1, updatedAt: -1 });
    
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get a specific note
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    }).populate('folderId', 'name color');
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new note
router.post('/', async (req, res) => {
  try {
    const { title, content, folderId, color, position } = req.body;
    
    const note = new Note({
      title,
      content,
      userId: req.user._id,
      folderId: folderId || null,
      color: color || '#FEF3C7',
      position: position || { x: 0, y: 0 }
    });
    
    await note.save();
    await note.populate('folderId', 'name color');
    
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: 'Error creating note', error: error.message });
  }
});

// Update a note
router.put('/:id', async (req, res) => {
  try {
    const { title, content, folderId, color, position, isPinned } = req.body;
    
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(folderId !== undefined && { folderId: folderId || null }),
        ...(color !== undefined && { color }),
        ...(position !== undefined && { position }),
        ...(isPinned !== undefined && { isPinned })
      },
      { new: true, runValidators: true }
    ).populate('folderId', 'name color');
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.json(note);
  } catch (error) {
    res.status(400).json({ message: 'Error updating note', error: error.message });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user._id 
    });
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Move note to folder
router.patch('/:id/move', async (req, res) => {
  try {
    const { folderId } = req.body;
    
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { folderId: folderId || null },
      { new: true }
    ).populate('folderId', 'name color');
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.json(note);
  } catch (error) {
    res.status(400).json({ message: 'Error moving note', error: error.message });
  }
});

export default router;