import express from 'express';
import Folder from '../models/Folder.js';
import Note from '../models/Note.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all folders for the authenticated user
router.get('/', async (req, res) => {
    try {
        const folders = await Folder.find({ userId: req.user._id })
            .sort({ createdAt: -1 });

        // Get note count for each folder
        const foldersWithCount = await Promise.all(
            folders.map(async (folder) => {
                const noteCount = await Note.countDocuments({
                    folderId: folder._id,
                    userId: req.user._id
                });
                return {
                    ...folder.toObject(),
                    noteCount
                };
            })
        );

        res.json(foldersWithCount);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get a specific folder
router.get('/:id', async (req, res) => {
    try {
        const folder = await Folder.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!folder) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        // Get note count
        const noteCount = await Note.countDocuments({
            folderId: folder._id,
            userId: req.user._id
        });

        res.json({
            ...folder.toObject(),
            noteCount
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get notes in a specific folder
router.get('/:id/notes', async (req, res) => {
    try {
        const folder = await Folder.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!folder) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        const notes = await Note.find({
            folderId: req.params.id,
            userId: req.user._id
        }).sort({ isPinned: -1, updatedAt: -1 });

        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create a new folder
router.post('/', async (req, res) => {
    try {
        const { name, color } = req.body;

        // Check if folder name already exists for this user
        const existingFolder = await Folder.findOne({
            name,
            userId: req.user._id
        });

        if (existingFolder) {
            return res.status(400).json({
                message: 'Folder with this name already exists'
            });
        }

        const folder = new Folder({
            name,
            color: color || '#3B82F6',
            userId: req.user._id
        });

        await folder.save();

        res.status(201).json({
            ...folder.toObject(),
            noteCount: 0
        });
    } catch (error) {
        res.status(400).json({ message: 'Error creating folder', error: error.message });
    }
});

// Update a folder
router.put('/:id', async (req, res) => {
    try {
        const { name, color } = req.body;

        // Check if new name conflicts with existing folder
        if (name) {
            const existingFolder = await Folder.findOne({
                name,
                userId: req.user._id,
                _id: { $ne: req.params.id }
            });

            if (existingFolder) {
                return res.status(400).json({
                    message: 'Folder with this name already exists'
                });
            }
        }

        const folder = await Folder.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            {
                ...(name !== undefined && { name }),
                ...(color !== undefined && { color })
            },
            { new: true, runValidators: true }
        );

        if (!folder) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        // Get note count
        const noteCount = await Note.countDocuments({
            folderId: folder._id,
            userId: req.user._id
        });

        res.json({
            ...folder.toObject(),
            noteCount
        });
    } catch (error) {
        res.status(400).json({ message: 'Error updating folder', error: error.message });
    }
});

// Delete a folder
router.delete('/:id', async (req, res) => {
    try {
        const folder = await Folder.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!folder) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        // Move all notes in this folder to no folder (folderId = null)
        await Note.updateMany(
            { folderId: req.params.id, userId: req.user._id },
            { folderId: null }
        );

        // Delete the folder
        await Folder.findByIdAndDelete(req.params.id);

        res.json({ message: 'Folder deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
export default router;