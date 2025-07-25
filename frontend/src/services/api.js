const API_BASE_URL = 'https://sticky-note-app-8ge7.onrender.com' || 'http://localhost:5000/api'

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    }
}

// Helper function to handle API responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Network error' }))
        throw new Error(error.message || 'Something went wrong')
    }
    return response.json()
}

// Auth API
export const authAPI = {
    login: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })
        return handleResponse(response)
    },

    signup: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        return handleResponse(response)
    },

    getCurrentUser: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: getAuthHeaders()
        })
        return handleResponse(response)
    }
}

// Notes API
export const notesAPI = {
    // Get all notes (optionally filtered by folder)
    getNotes: async (folderId = null) => {
        const url = folderId
            ? `${API_BASE_URL}/notes?folderId=${folderId}`
            : `${API_BASE_URL}/notes`

        const response = await fetch(url, {
            headers: getAuthHeaders()
        })
        return handleResponse(response)
    },

    // Get a specific note
    getNote: async (id) => {
        const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
            headers: getAuthHeaders()
        })
        return handleResponse(response)
    },

    // Create a new note
    createNote: async (noteData) => {
        const response = await fetch(`${API_BASE_URL}/notes`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(noteData)
        })
        return handleResponse(response)
    },

    // Update a note
    updateNote: async (id, noteData) => {
        const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(noteData)
        })
        return handleResponse(response)
    },

    // Delete a note
    deleteNote: async (id) => {
        const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        })
        return handleResponse(response)
    },

    // Move note to folder
    moveNote: async (id, folderId) => {
        const response = await fetch(`${API_BASE_URL}/notes/${id}/move`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({ folderId })
        })
        return handleResponse(response)
    }
}

// Folders API
export const foldersAPI = {
    // Get all folders
    getFolders: async () => {
        const response = await fetch(`${API_BASE_URL}/folders`, {
            headers: getAuthHeaders()
        })
        return handleResponse(response)
    },

    // Get a specific folder
    getFolder: async (id) => {
        const response = await fetch(`${API_BASE_URL}/folders/${id}`, {
            headers: getAuthHeaders()
        })
        return handleResponse(response)
    },

    // Get notes in a folder
    getFolderNotes: async (id) => {
        const response = await fetch(`${API_BASE_URL}/folders/${id}/notes`, {
            headers: getAuthHeaders()
        })
        return handleResponse(response)
    },

    // Create a new folder
    createFolder: async (folderData) => {
        const response = await fetch(`${API_BASE_URL}/folders`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(folderData)
        })
        return handleResponse(response)
    },

    // Update a folder
    updateFolder: async (id, folderData) => {
        const response = await fetch(`${API_BASE_URL}/folders/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(folderData)
        })
        return handleResponse(response)
    },

    // Delete a folder
    deleteFolder: async (id) => {
        const response = await fetch(`${API_BASE_URL}/folders/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        })
        return handleResponse(response)
    }
}