# 📝 Sticky Notes Frontend

A modern React application for managing sticky notes with folders, built with Vite and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Architecture

### State Management
- **React Context** for global state management
- **useReducer** for complex state updates
- **Custom hooks** for reusable logic

### Component Structure
```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── Sidebar.jsx     # Folder navigation
│   ├── NoteCard.jsx    # Individual note display
│   ├── NoteModal.jsx   # Note creation/editing
│   └── ...
├── context/            # React Context providers
│   └── AppContext.jsx  # Main application state
├── hooks/              # Custom React hooks
│   └── useTheme.js     # Theme management
├── pages/              # Page components
│   ├── LoginPage.jsx   # Authentication pages
│   └── DashboardPage.jsx
├── services/           # API service layer
│   └── api.js          # Backend API calls
└── main.jsx           # Application entry point
```

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Dark/Light theme** support
- **Responsive design** with mobile-first approach
- **Custom color palette** with primary/secondary colors

## 🔌 API Integration

All backend communication is handled through the `api.js` service layer:

```javascript
import { notesAPI, foldersAPI, authAPI } from './services/api'

// Create a note
const newNote = await notesAPI.createNote({ title, content, color })

// Get all folders
const folders = await foldersAPI.getFolders()
```

## 🎯 Key Features

- ✅ **Authentication** - Login/Signup with JWT
- ✅ **Notes CRUD** - Create, read, update, delete notes
- ✅ **Folders** - Organize notes in folders
- ✅ **Search** - Real-time note searching
- ✅ **Themes** - Dark/Light mode toggle
- ✅ **Responsive** - Mobile-friendly design
- ✅ **Loading States** - User feedback during operations
- ✅ **Error Handling** - Comprehensive error management

## 🛠️ Development

### Environment Variables
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- ESLint configuration for React
- Prettier for code formatting
- Consistent component structure

## 📱 Responsive Design

The application is built mobile-first with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🎨 Theme System

Dark/Light theme support with:
- System preference detection
- Manual theme toggle
- Persistent theme storage
- Smooth transitions

## 🔄 State Management Flow

```javascript
// Context provides centralized state
const { notes, folders, loading, error, createNote } = useApp()

// Actions update state through reducer
dispatch({ type: ACTIONS.ADD_NOTE, payload: newNote })

// Components react to state changes
{loading && <LoadingSpinner />}
{error && <ErrorMessage />}
```

## 🚀 Performance

- **Code splitting** with React.lazy
- **Optimized re-renders** with React.memo
- **Efficient state updates** with useReducer
- **Minimal bundle size** with Vite

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests in watch mode
npm run test:watch
```

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The build outputs to `dist/` directory and can be deployed to any static hosting service.