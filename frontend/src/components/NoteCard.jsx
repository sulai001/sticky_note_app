import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { getNoteColorClasses } from '../utils/colors'
import MoveNoteModal from './MoveNoteModal'
import NoteContextMenu from './NoteContextMenu'
import RenameNoteModal from './RenameNoteModal'

export default function NoteCard({ note, onEdit }) {
  const { deleteNote, updateNote, refreshData } = useApp()
  const colorClasses = getNoteColorClasses(note.color)
  const [showMoveModal, setShowMoveModal] = useState(false)
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
  const [showRenameModal, setShowRenameModal] = useState(false)

  const handleDelete = async (e) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(note._id)
      } catch (error) {
        console.error('Error deleting note:', error)
      }
    }
  }

  const handleMoveToFolder = async (folderId) => {
    try {
      console.log('Moving note to folder:', { noteId: note._id, folderId })
      // Only update the folderId, not the entire note object
      await updateNote(note._id, { folderId })
      console.log('Note moved successfully')

      // Refresh all data to ensure sync
      await refreshData()
    } catch (error) {
      console.error('Error moving note:', error)
      throw error // Let the modal handle the error
    }
  }

  const handleOpenMoveModal = (e) => {
    e.stopPropagation()
    setShowMoveModal(true)
  }

  const handleEdit = () => {
    onEdit(note)
  }

  const handleRightClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setContextMenuPosition({ x: e.clientX, y: e.clientY })
    setShowContextMenu(true)
  }

  const handleRename = async (newTitle) => {
    try {
      await updateNote(note._id, { title: newTitle })
      await refreshData()
    } catch (error) {
      console.error('Error renaming note:', error)
      throw error
    }
  }

  const handleContextDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(note._id)
    }
  }

  return (
    <div className="relative">
      {/* Background shadow */}
      <div
        className="absolute inset-0 bg-black/20 rounded-sm"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)',
          transform: `translate(4px, 6px) rotate(${Math.random() * 4 - 2}deg)`,
          filter: 'blur(3px)',
          zIndex: -1
        }}
      ></div>

      <div
        onDoubleClick={handleEdit}
        onContextMenu={handleRightClick}
        className={`note-card relative ${colorClasses.background} p-3 sm:p-6 w-full h-[200px] sm:h-[280px] flex flex-col group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:rotate-1`}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)',
          boxShadow: `
          0 4px 8px rgba(0, 0, 0, 0.1),
          0 8px 16px rgba(0, 0, 0, 0.05),
          inset 0 1px 0 rgba(2555, 255, 255, 0.3)
        `,
          background: `
          linear-gradient(135deg, 
            ${colorClasses.background.includes('yellow') ? '#fef3c7' :
              colorClasses.background.includes('blue') ? '#dbeafe' :
                colorClasses.background.includes('green') ? '#d1fae5' :
                  colorClasses.background.includes('pink') ? '#fce7f3' :
                    colorClasses.background.includes('purple') ? '#e9d5ff' : '#f3f4f6'} 0%,
            ${colorClasses.background.includes('yellow') ? '#fde68a' :
              colorClasses.background.includes('blue') ? '#bfdbfe' :
                colorClasses.background.includes('green') ? '#a7f3d0' :
                  colorClasses.background.includes('pink') ? '#f9a8d4' :
                    colorClasses.background.includes('purple') ? '#c4b5fd' : '#e5e7eb'} 100%
          ),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 24px,
            rgba(0, 0, 0, 0.03) 25px
          )
        `,
          transform: `rotate(${Math.random() * 6 - 3}deg)`,
          transformOrigin: 'center center'
        }}
      >
        {/* Folded corner */}
        <div
          className="absolute top-0 right-0 w-4 h-4 bg-black/10"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
            filter: 'blur(0.5px)'
          }}
        ></div>

        {/* Tape effect */}
        <div
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 sm:w-16 h-4 sm:h-6 bg-yellow-100/80 rounded-sm shadow-sm"
          style={{
            background: 'linear-gradient(45deg, #fef3c7, #fde68a)',
            transform: `translateX(-50%) rotate(${Math.random() * 10 - 5}deg)`,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
          }}
        ></div>

        {/* Action buttons */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-1">
          {/* Move to folder button */}
          <button
            onClick={handleOpenMoveModal}
            className="w-5 h-5 bg-blue-500/80 text-white rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center shadow-sm"
            title="Move to folder"
          >
            <i className="ri-folder-transfer-line text-xs"></i>
          </button>

          {/* Delete button */}
          <button
            onClick={handleDelete}
            className="w-5 h-5 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center shadow-sm"
            title="Delete note"
          >
            <i className="ri-close-line text-xs"></i>
          </button>
        </div>

        {/* Note content */}
        <h3 className={`font-bold ${colorClasses.text} mb-2 sm:mb-3 pr-6 leading-tight text-sm sm:text-base`}
          style={{
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
          }}>
          {note.title}
        </h3>

        <p
          className={`${colorClasses.text} text-xs sm:text-sm overflow-hidden flex-1 leading-relaxed line-clamp-5 sm:line-clamp-8`}
          style={{
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            textShadow: '0 1px 1px rgba(0, 0, 0, 0.05)'
          }}
        >
          {note.content}
        </p>

        <div className={`mt-auto text-xs ${colorClasses.text} opacity-50 text-right`}
          style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
          {new Date(note.createdAt || note.updatedAt).toLocaleDateString()}
        </div>
      </div>

      {/* Move Note Modal */}
      <MoveNoteModal
        isOpen={showMoveModal}
        onClose={() => setShowMoveModal(false)}
        note={note}
        onMove={handleMoveToFolder}
      />

      {/* Context Menu */}
      <NoteContextMenu
        isOpen={showContextMenu}
        position={contextMenuPosition}
        onClose={() => setShowContextMenu(false)}
        onEdit={() => onEdit(note)}
        onRename={() => setShowRenameModal(true)}
        onDelete={handleContextDelete}
      />

      {/* Rename Modal */}
      <RenameNoteModal
        isOpen={showRenameModal}
        onClose={() => setShowRenameModal(false)}
        note={note}
        onRename={handleRename}
      />
    </div>
  )
}