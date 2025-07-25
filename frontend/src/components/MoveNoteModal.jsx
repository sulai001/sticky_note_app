import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function MoveNoteModal({ isOpen, onClose, note, onMove }) {
  const { folders } = useApp()
  const [selectedFolderId, setSelectedFolderId] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedFolderId) {
      return
    }

    try {
      await onMove(selectedFolderId)
      onClose()
    } catch (error) {
      console.error('Error moving note:', error)
    }
  }

  const handleClose = () => {
    setSelectedFolderId('')
    onClose()
  }

  if (!isOpen || !note) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Move Note to Folder
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                "{note.title}"
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select Folder
              </label>
              
              {folders.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <i className="ri-folder-line text-3xl mb-2"></i>
                  <p>No folders available</p>
                  <p className="text-xs">Create a folder first</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {folders.map((folder) => (
                    <label
                      key={folder._id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                        selectedFolderId === folder._id
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <input
                        type="radio"
                        name="folder"
                        value={folder._id}
                        checked={selectedFolderId === folder._id}
                        onChange={(e) => setSelectedFolderId(e.target.value)}
                        className="sr-only"
                      />
                      
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0 border border-gray-200 dark:border-gray-600"
                        style={{ 
                          backgroundColor: folder.color ? `${folder.color}20` : '#3B82F620',
                          borderColor: folder.color || '#3B82F6'
                        }}
                      ></div>
                      
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {folder.name}
                        </span>
                      </div>
                      
                      {selectedFolderId === folder._id && (
                        <i className="ri-check-line text-primary"></i>
                      )}
                    </label>
                  ))}
                </div>
              )}
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
                disabled={!selectedFolderId}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Move Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}