import { useApp } from '../context/AppContext'
import NoteCard from './NoteCard'

export default function NotesGrid({ onEditNote }) {
  const { getFilteredNotes, viewMode, notes, currentFolder } = useApp()
  const filteredNotes = getFilteredNotes()

  // Clean logging
  if (currentFolder) {
    console.log(`Showing ${filteredNotes.length} notes in folder "${currentFolder.name}"`)
  }

  if (filteredNotes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
          <i className="ri-sticky-note-line text-3xl text-yellow-600 dark:text-yellow-400"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No notes yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Create your first sticky note to get started
        </p>
        <button
          onClick={() => onEditNote(null)}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <i className="ri-add-line mr-2"></i>Create Note
        </button>
      </div>
    )
  }

  return (
    <div className={`${viewMode === 'grid'
      ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6'
      : 'space-y-4'
      } min-h-[calc(100vh-240px)]`}>
      {filteredNotes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEditNote}
        />
      ))}
    </div>
  )
}