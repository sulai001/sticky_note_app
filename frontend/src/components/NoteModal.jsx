import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { getColorOptions, getColorConfig } from '../utils/colors'

export default function NoteModal({ isOpen, onClose, editingNote }) {
  const { createNote, updateNote } = useApp()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    color: 'yellow'
  })

  useEffect(() => {
    if (editingNote) {
      // Get the color name from the stored color value
      const colorConfig = getColorConfig(editingNote.color)
      setFormData({
        title: editingNote.title,
        content: editingNote.content,
        color: colorConfig.name
      })
    } else {
      setFormData({
        title: '',
        content: '',
        color: 'yellow'
      })
    }
  }, [editingNote, isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.content.trim()) {
      return
    }

    try {
      // Get the hex value for the selected color
      const colorConfig = getColorConfig(formData.color)
      const noteData = {
        ...formData,
        color: colorConfig.hex // Send hex value to backend
      }

      if (editingNote) {
        // Update existing note
        await updateNote(editingNote._id, noteData)
      } else {
        // Create new note
        await createNote(noteData)
      }
      onClose()
    } catch (error) {
      console.error('Error saving note:', error)
      // You can add error handling UI here
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleColorSelect = (color) => {
    setFormData(prev => ({
      ...prev,
      color
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md transform transition-all">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {editingNote ? 'Edit Note' : 'New Note'}
            </h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter note title"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="4"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Enter note content"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Background Color
              </label>
              <div className="flex gap-2">
                {getColorOptions().map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => handleColorSelect(color.name)}
                    className={`w-8 h-8 rounded-full ${color.displayClass} border-2 transition-colors ${formData.color === color.name
                        ? 'border-gray-400 ring-2 ring-gray-400'
                        : 'border-transparent hover:border-gray-400'
                      }`}
                    title={`${color.name.charAt(0).toUpperCase() + color.name.slice(1)} note`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btnbtn flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                {editingNote ? 'Update Note' : 'Save Note'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}