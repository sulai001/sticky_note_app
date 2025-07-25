import { useState } from 'react'
import { useApp, ACTIONS } from '../context/AppContext'
import FolderModal from './FolderModal'
import FolderEditModal from './FolderEditModal'

export default function Sidebar({ isOpen, onClose }) {
  const { folders, notes, currentFolder, dispatch } = useApp()
  const [showFolderModal, setShowFolderModal] = useState(false)
  const [showFolderEditModal, setShowFolderEditModal] = useState(false)
  const [editingFolder, setEditingFolder] = useState(null)

  const handleFolderSelect = (folder) => {
    dispatch({ type: ACTIONS.SET_CURRENT_FOLDER, payload: folder })
    onClose?.()
  }

  const handleNewFolder = () => {
    setShowFolderModal(true)
  }

  const handleFolderDoubleClick = (e, folder) => {
    e.stopPropagation()
    setEditingFolder(folder)
    setShowFolderEditModal(true)
  }

  return (
    <>
      {/* Sidebar */}
      <aside
className={`pt-5 fixed lg:relative inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform ${isOpen ? 'translate-x-0 pt-20' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 h-screen`}
      >
        <div className="p-4">
          {/* New Folder Button */}
          <button
            onClick={handleNewFolder}
            className="btnbtn w-full flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors mb-4"
          >
            <i className="ri-folder-add-line"></i>
            <span>New Folder</span>
          </button>

          {/* Folders List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Folders
              </h3>
            </div>

            <div className="space-y-1">
              {/* All Notes */}
              <div
                onClick={() => handleFolderSelect(null)}
                className={`btnbtn flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${!currentFolder
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                <i className="ri-file-list-line"></i>
                <span>All Notes</span>
                <span className="ml-auto text-xs opacity-75">{notes.length}</span>
              </div>

              {/* Folder Items */}
              {folders.map((folder) => {
                const folderNotes = notes.filter(note => note.folderId === folder._id)
                const isSelected = currentFolder?._id === folder._id

                return (
                  <div
                    key={folder._id}
                    onClick={() => handleFolderSelect(folder)}
                    onDoubleClick={(e) => handleFolderDoubleClick(e, folder)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isSelected
                        ? 'ring-2 ring-white/50 shadow-lg transform scale-105'
                        : 'hover:shadow-md hover:transform hover:scale-102'
                      }`}
                    style={{
                      backgroundColor: folder.color || '#3B82F6',
                      color: isSelected ? 'white' : 'white',
                      opacity: isSelected ? 1 : 0.9
                    }}
                    title="Double-click to edit folder"
                  >
                    <i className="ri-folder-line text-white/90"></i>
                    <span className="text-white font-medium">{folder.name}</span>
                    <span className="ml-auto text-xs text-white/75 bg-white/20 px-2 py-1 rounded-full">
                      {folder.noteCount || folderNotes.length}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden h-screen"
        />
      )}

      {/* Folder Modal */}
      <FolderModal
        isOpen={showFolderModal}
        onClose={() => setShowFolderModal(false)}
      />

      {/* Folder Edit Modal */}
      <FolderEditModal
        isOpen={showFolderEditModal}
        onClose={() => {
          setShowFolderEditModal(false)
          setEditingFolder(null)
        }}
        folder={editingFolder}
      />
    </>
  )
}