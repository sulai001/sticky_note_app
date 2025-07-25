import { useState } from 'react'
import { useApp, ACTIONS } from '../context/AppContext'

export default function Header({ onSidebarToggle, user, onLogout }) {
  const { theme, notes, folders, searchQuery, dispatch } = useApp()
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    dispatch({ type: ACTIONS.SET_THEME, payload: newTheme })
    
    // Also update the document class immediately
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleSearchChange = (e) => {
    dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: e.target.value })
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onSidebarToggle}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <i className="ri-menu-line text-lg"></i>
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white font-['Pacifico']">
              Sticky Notes
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-search-line text-gray-400"></i>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search notes and folders..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              <i className={`${theme === 'light' ? 'ri-sun-line' : 'ri-moon-line'} text-lg`}></i>
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="btnbtn flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="bg black w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-white text-sm"></i>
                </div>
                <span className="hidden sm:block text-gray-700 dark:text-gray-300 text-sm font-medium">
                  {user?.username || 'Profile'}
                </span>
              </button>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center">
                        <i className="ri-user-line text-white text-lg"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {user?.username || 'John Doe'}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user?.email || 'john@example.com'}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total Notes</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {notes.length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total Folders</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {folders.length}
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <i className="ri-logout-box-line"></i>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}