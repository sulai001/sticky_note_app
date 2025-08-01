import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import database connection
import connectDB from './config/database.js';

// Import routes
import authRoutes from './routes/auth.js';
import noteRoutes from './routes/notes.js';
import folderRoutes from './routes/folders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://sticky-note-app-12.onrender.com',
    /\.onrender\.com$/
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/folders', folderRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Sticky Notes API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});