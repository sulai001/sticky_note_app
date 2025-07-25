import { createContext, useContext, useReducer, useEffect } from 'react'
import { notesAPI, foldersAPI } from '../services/api'

// Initial state
const initialState = {
  notes: [],
  folders: [],
  currentFolder: null,
  searchQuery: '',
  viewMode: 'grid', // 'grid' or 'list'
  theme: 'light',
  user: null,
  loading: false,
  error: null
}

// Action types
export const ACTIONS = {
  SET_NOTES: 'SET_NOTES',
  ADD_NOTE: 'ADD_NOTE',
  UPDATE_NOTE: 'UPDATE_NOTE',
  DELETE_NOTE: 'DELETE_NOTE',
  SET_FOLDERS: 'SET_FOLDERS',
  ADD_FOLDER: 'ADD_FOLDER',
  DELETE_FOLDER: 'DELETE_FOLDER',
  SET_CURRENT_FOLDER: 'SET_CURRENT_FOLDER',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_VIEW_MODE: 'SET_VIEW_MODE',
  SET_THEME: 'SET_THEME',
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
}

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_NOTES:
      return { ...state, notes: action.payload }

    case ACTIONS.ADD_NOTE:
      return { ...state, notes: [...state.notes, action.payload] }

    case ACTIONS.UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map(note =>
          note._id === action.payload._id ? action.payload : note
        )
      }

    case ACTIONS.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note._id !== action.payload)
      }

    case ACTIONS.SET_FOLDERS:
      return { ...state, folders: action.payload }

    case ACTIONS.ADD_FOLDER:
      return { ...state, folders: [...state.folders, action.payload] }

    case ACTIONS.DELETE_FOLDER:
      return {
        ...state,
        folders: state.folders.filter(folder => folder._id !== action.payload),
        notes: state.notes.filter(note => note.folderId !== action.payload),
        currentFolder: state.currentFolder?._id === action.payload ? null : state.currentFolder
      }

    case ACTIONS.SET_CURRENT_FOLDER:
      return { ...state, currentFolder: action.payload }

    case ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload }

    case ACTIONS.SET_VIEW_MODE:
      return { ...state, viewMode: action.payload }

    case ACTIONS.SET_THEME:
      return { ...state, theme: action.payload }

    case ACTIONS.SET_USER:
      return { ...state, user: action.payload }

    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload }

    default:
      return state
  }
}

// Create context
const AppContext = createContext()

// Context provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load initial data from backend
  useEffect(() => {
    const loadInitialData = async () => {
      const token = localStorage.getItem('token')
      if (!token) return

      dispatch({ type: ACTIONS.SET_LOADING, payload: true })

      try {
        // Load folders and notes in parallel
        const [foldersData, notesData] = await Promise.all([
          foldersAPI.getFolders(),
          notesAPI.getNotes()
        ])

        dispatch({ type: ACTIONS.SET_FOLDERS, payload: foldersData })
        dispatch({ type: ACTIONS.SET_NOTES, payload: notesData })
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
        console.error('Failed to load initial data:', error)
      } finally {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false })
      }
    }

    loadInitialData()
  }, [])

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    dispatch({ type: ACTIONS.SET_THEME, payload: savedTheme })
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', state.theme)
    document.documentElement.classList.toggle('dark', state.theme === 'dark')
  }, [state.theme])

  // API Action functions
  const createNote = async (noteData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    dispatch({ type: ACTIONS.SET_ERROR, payload: null })

    try {
      const notePayload = {
        ...noteData,
        folderId: state.currentFolder?._id || null
      }

      // Debug logging
      console.log('Creating note with data:', notePayload)
      console.log('Current folder:', state.currentFolder)

      const newNote = await notesAPI.createNote(notePayload)
      dispatch({ type: ACTIONS.ADD_NOTE, payload: newNote })
      return newNote
    } catch (error) {
      console.error('Error creating note:', error)
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
      throw error
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  const updateNote = async (id, noteData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    dispatch({ type: ACTIONS.SET_ERROR, payload: null })

    try {
      console.log('Updating note with data:', { id, noteData })
      const updatedNote = await notesAPI.updateNote(id, noteData)
      console.log('Note updated successfully:', updatedNote)
      console.log('Updated note folderId:', updatedNote.folderId)
      dispatch({ type: ACTIONS.UPDATE_NOTE, payload: updatedNote })
      return updatedNote
    } catch (error) {
      console.error('Error in updateNote:', error)
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
      throw error
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  const deleteNote = async (id) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    dispatch({ type: ACTIONS.SET_ERROR, payload: null })

    try {
      await notesAPI.deleteNote(id)
      dispatch({ type: ACTIONS.DELETE_NOTE, payload: id })
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
      throw error
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  const createFolder = async (folderData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    dispatch({ type: ACTIONS.SET_ERROR, payload: null })

    try {
      const newFolder = await foldersAPI.createFolder(folderData)
      dispatch({ type: ACTIONS.ADD_FOLDER, payload: newFolder })
      return newFolder
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
      throw error
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  const updateFolder = async (id, folderData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    dispatch({ type: ACTIONS.SET_ERROR, payload: null })

    try {
      const updatedFolder = await foldersAPI.updateFolder(id, folderData)
      dispatch({ type: ACTIONS.SET_FOLDERS, payload: state.folders.map(folder => 
        folder._id === id ? updatedFolder : folder
      )})
      return updatedFolder
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
      throw error
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  const deleteFolder = async (id) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    dispatch({ type: ACTIONS.SET_ERROR, payload: null })

    try {
      await foldersAPI.deleteFolder(id)
      dispatch({ type: ACTIONS.DELETE_FOLDER, payload: id })
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
      throw error
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  const refreshData = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })

    try {
      const [foldersData, notesData] = await Promise.all([
        foldersAPI.getFolders(),
        notesAPI.getNotes()
      ])

      dispatch({ type: ACTIONS.SET_FOLDERS, payload: foldersData })
      dispatch({ type: ACTIONS.SET_NOTES, payload: notesData })
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  // Helper functions
  const getFilteredNotes = () => {
    let filtered = state.currentFolder
      ? state.notes.filter(note => {
          // Handle both populated folder objects and string IDs
          let noteFolderId = null
          
          if (note.folderId) {
            // If folderId is an object (populated), get the _id
            if (typeof note.folderId === 'object' && note.folderId._id) {
              noteFolderId = note.folderId._id.toString()
            } else {
              // If folderId is a string, use it directly
              noteFolderId = note.folderId.toString()
            }
          }
          
          const currentFolderId = state.currentFolder._id.toString()
          return noteFolderId === currentFolderId
        })
      : state.notes

    if (state.searchQuery) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(state.searchQuery.toLowerCase())
      )
    }
    
    // Debug logging
    if (state.currentFolder) {
      console.log(`Filtering for folder "${state.currentFolder.name}" (${state.currentFolder._id}):`)
      console.log(`- Total notes: ${state.notes.length}`)
      console.log(`- Filtered notes: ${filtered.length}`)
      console.log('- All notes with their folderIds:', state.notes.map(note => ({ 
        title: note.title, 
        folderId: note.folderId,
        folderIdType: typeof note.folderId,
        folderIdString: note.folderId?.toString()
      })))
      
      // Show first 5 notes individually for easier reading
      console.log('- First 5 notes details:')
      state.notes.slice(0, 5).forEach((note, index) => {
        console.log(`  ${index + 1}. "${note.title}": folderId="${note.folderId}" (${typeof note.folderId})`)
      })
      console.log('- Current folder ID:', state.currentFolder._id)
      console.log('- Current folder ID type:', typeof state.currentFolder._id)
      console.log('- Notes with matching folderIds:', filtered.map(note => ({ 
        title: note.title, 
        folderId: note.folderId 
      })))
    }
    
    return filtered
  }

  const contextValue = {
    ...state,
    dispatch,
    // API actions
    createNote,
    updateNote,
    deleteNote,
    createFolder,
    updateFolder,
    deleteFolder,
    refreshData,
    // Helper functions
    getFilteredNotes
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}