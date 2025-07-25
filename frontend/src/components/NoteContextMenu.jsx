import { useState, useEffect } from 'react'

export default function NoteContextMenu({ isOpen, position, onClose, onEdit, onDelete, onRename }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 150)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = () => {
      onClose()
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isVisible) return null

  return (
    <div
      className={`fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 min-w-[160px] transition-all duration-150 ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        left: position.x,
        top: position.y,
        transformOrigin: 'top left'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => {
          onEdit()
          onClose()
        }}
        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
      >
        <i className="ri-edit-line text-blue-500"></i>
        Edit Note
      </button>
      
      <button
        onClick={() => {
          onRename()
          onClose()
        }}
        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
      >
        <i className="ri-pencil-line text-green-500"></i>
        Rename Note
      </button>
      
      <hr className="my-1 border-gray-200 dark:border-gray-600" />
      
      <button
        onClick={() => {
          onDelete()
          onClose()
        }}
        className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
      >
        <i className="ri-delete-bin-line"></i>
        Delete Note
      </button>
    </div>
  )
}