# 🚀 Sticky Notes App - Complete Setup Guide

## 📋 Project Overview

A full-stack sticky notes application with React frontend and Node.js/Express backend, featuring:
- ✅ User authentication (JWT)
- ✅ CRUD operations for notes and folders
- ✅ Dark/Light theme toggle
- ✅ Responsive design
- ✅ Real-time search
- ✅ MongoDB data persistence

## 🏗️ Project Structure

```
sticky_note_app/
├── backend/                 # Node.js/Express API
│   ├── config/             # Database configuration
│   ├── middleware/         # Authentication middleware
│   ├── models/            # MongoDB models (User, Note, Folder)
│   ├── routes/            # API routes (auth, notes, folders)
│   └── server.js          # Main server file
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React Context for state management
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   └── services/      # API service layer
│   └── public/            # Static assets
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd sticky_note_app
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sticky-notes
JWT_SECRET=your-super-secret-jwt-key-here
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

## 🔧 Environment Configuration

### Backend Environment Variables
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token signing

### Frontend Environment Variables
- `VITE_API_BASE_URL` - Backend API base URL

## 🚀 Running the Application

1. **Start MongoDB** (if running locally)
2. **Start Backend Server**: `cd backend && npm run dev`
3. **Start Frontend Server**: `cd frontend && npm run dev`
4. **Open Browser**: Navigate to `http://localhost:5173`

## 📱 Features

### Authentication
- ✅ User registration with email/password
- ✅ User login with JWT tokens
- ✅ Protected routes
- ✅ Automatic token refresh

### Notes Management
- ✅ Create, read, update, delete notes
- ✅ Color-coded notes (5 colors)
- ✅ Search functionality
- ✅ Grid/List view toggle

### Folders Management
- ✅ Create and delete folders
- ✅ Organize notes in folders
- ✅ Folder-based filtering

### UI/UX
- ✅ Dark/Light theme toggle
- ✅ Responsive design (mobile-first)
- ✅ Loading states and error handling
- ✅ Smooth animations and transitions

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Notes
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note
- `PATCH /api/notes/:id/move` - Move note to folder

### Folders
- `GET /api/folders` - Get all folders
- `POST /api/folders` - Create new folder
- `PUT /api/folders/:id` - Update folder
- `DELETE /api/folders/:id` - Delete folder

## 🎨 Component Architecture

### Context-Based State Management
```javascript
// AppContext provides centralized state
const { 
  notes, folders, currentFolder, loading, error,
  createNote, updateNote, deleteNote,
  createFolder, deleteFolder 
} = useApp()
```

### Key Components
- **`AppContext`** - Central state management
- **`Header`** - Navigation with search and theme toggle
- **`Sidebar`** - Folder navigation
- **`NotesGrid`** - Notes display with grid/list views
- **`NoteModal`** - Note creation/editing modal
- **`Login/Signup`** - Authentication components

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured for frontend URL
   - Check if both servers are running

2. **Database Connection**
   - Verify MongoDB is running
   - Check MONGODB_URI in backend .env

3. **Authentication Issues**
   - Clear localStorage and try again
   - Check JWT_SECRET is set in backend

4. **API Connection**
   - Verify VITE_API_BASE_URL in frontend .env
   - Check network tab for failed requests

### Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload
2. **Database GUI**: Use MongoDB Compass for database inspection
3. **API Testing**: Use Postman or Thunder Client for API testing
4. **Debugging**: Check browser console and server logs

## 📦 Production Deployment

### Backend Deployment
1. Set production environment variables
2. Use PM2 or similar for process management
3. Configure reverse proxy (nginx)
4. Use MongoDB Atlas for database

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or similar
3. Update VITE_API_BASE_URL to production API

## 🔐 Security Considerations

- JWT tokens are stored in localStorage
- All API routes are protected with authentication middleware
- Passwords are hashed using bcrypt
- Input validation on both frontend and backend
- CORS configured for specific origins

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.