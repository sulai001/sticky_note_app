import { useApp, ACTIONS } from '../context/AppContext'

export default function ContentHeader({ onNewNote, onNewFolder }) {
  const { currentFolder, viewMode, dispatch } = useApp()

  const handleViewToggle = (mode) => {
    dispatch({ type: ACTIONS.SET_VIEW_MODE, payload: mode })
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {currentFolder ? currentFolder.name : 'All Notes'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {currentFolder 
            ? `Notes in ${currentFolder.name}` 
            : 'Manage your sticky notes'
          }
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* View Toggle */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => handleViewToggle('grid')}
            className={`px-3 py-1 rounded transition-all ${
              viewMode === 'grid' 
                ? 'bg-white dark:bg-gray-600 shadow-sm' 
                : ''
            }`}
          >
            <i className="ri-grid-line text-sm"></i>
          </button>
          <button
            onClick={() => handleViewToggle('list')}
            className={`px-3 py-1 rounded transition-all ${
              viewMode === 'list' 
                ? 'bg-white dark:bg-gray-600 shadow-sm' 
                : ''
            }`}
          >
            <i className="ri-list-check text-sm"></i>
          </button>
        </div>

        {/* New Note Button */}
        <button
          onClick={onNewNote}
          className="btnbtn flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <i className="ri-add-line"></i>
          <span className="hidden sm:inline">New Note</span>
        </button>
      </div>
    </div>
  )
}