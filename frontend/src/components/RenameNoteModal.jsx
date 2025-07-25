import { useState, useEffect } from 'react'

export default function RenameNoteModal({ isOpen, onClose, note, onRename }) {
  const [newTitle, setNewTitle] = useState('')

  useEffect(() => {
    if (isOpen && note) {
      setNewTitle(note.title)
    }
  }, [isOpen, note])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!newTitle.trim() || newTitle.trim() === note.title) {
      onClose()
      return
    }

    try {
      await onRename(newTitle.trim())
      onClose()
    } catch (error) {
      console.error('Error renaming note:', error)
    }
  }

  const handleClose = () => {
    setNewTitle('')
    onClose()
  }

  if (!isOpen || !note) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Rename Note
            </h3>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Note Title
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter new note title"
                autoFocus
                maxLength={100}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Rename
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}