import { useState } from 'react'
import { useApp } from '../context/AppContext'

// Default folder colors
const DEFAULT_FOLDER_COLORS = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Orange', value: '#F59E0B' }
]

export default function FolderModal({ isOpen, onClose }) {
  const { createFolder } = useApp()
  const [folderName, setFolderName] = useState('')
  const [selectedColor, setSelectedColor] = useState(DEFAULT_FOLDER_COLORS[0].value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!folderName.trim()) {
      return
    }

    try {
      await createFolder({ 
        name: folderName.trim(),
        color: selectedColor
      })
      setFolderName('')
      setSelectedColor(DEFAULT_FOLDER_COLORS[0].value)
      onClose()
    } catch (error) {
      console.error('Error creating folder:', error)
      // You can add error handling UI here
    }
  }

  const handleClose = () => {
    setFolderName('')
    setSelectedColor(DEFAULT_FOLDER_COLORS[0].value)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              New Folder
            </h3>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Folder Name
              </label>
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter folder name"
                autoFocus
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Folder Color
              </label>
              <div className="flex gap-3 justify-center">
                {DEFAULT_FOLDER_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-12 h-12 rounded-full transition-all duration-200 flex items-center justify-center ${
                      selectedColor === color.value
                        ? 'ring-4 ring-gray-300 dark:ring-gray-600 scale-110 shadow-lg'
                        : 'hover:scale-105 hover:shadow-md'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={`${color.name} folder`}
                  >
                    {selectedColor === color.value && (
                      <i className="ri-check-line text-white text-xl font-bold"></i>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                Choose a color for your folder
              </p>
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
                className="btnbtn flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Create Folder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}