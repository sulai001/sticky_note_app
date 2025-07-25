import { useState } from 'react'
import { AppProvider, useApp } from '../context/AppContext'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import ContentHeader from '../components/ContentHeader'
import NotesGrid from '../components/NotesGrid'
import NoteModal from '../components/NoteModal'
import FolderModal from '../components/FolderModal'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

function DashboardContent({ user, onLogout }) {
  const { loading } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [noteModalOpen, setNoteModalOpen] = useState(false)
  const [folderModalOpen, setFolderModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  const handleNewNote = () => {
    setEditingNote(null)
    setNoteModalOpen(true)
  }

  const handleEditNote = (note) => {
    setEditingNote(note)
    setNoteModalOpen(true)
  }

  const handleNoteModalClose = () => {
    setNoteModalOpen(false)
    setEditingNote(null)
  }

  const handleNewFolder = () => {
    setFolderModalOpen(true)
  }

  const handleFolderModalClose = () => {
    setFolderModalOpen(false)
  }

  if (loading && !noteModalOpen && !folderModalOpen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your notes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header
        onSidebarToggle={handleSidebarToggle}
        user={user}
        onLogout={onLogout}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={handleSidebarClose}
        />

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto h-[calc(100vh-64px)]">
          <ContentHeader
            onNewNote={handleNewNote}
            onNewFolder={handleNewFolder}
          />

          <NotesGrid onEditNote={handleEditNote} />
        </main>
      </div>

      {/* Modals */}
      <NoteModal
        isOpen={noteModalOpen}
        onClose={handleNoteModalClose}
        editingNote={editingNote}
      />

      <FolderModal
        isOpen={folderModalOpen}
        onClose={handleFolderModalClose}
      />

      {/* Error Message */}
      <ErrorMessage />
    </div>
  )
}

function DashboardPage({ user, onLogout }) {
  return (
    <AppProvider>
      <DashboardContent user={user} onLogout={onLogout} />
    </AppProvider>
  )
}

export default DashboardPage