import { useApp, ACTIONS } from '../context/AppContext'

export default function ErrorMessage() {
  const { error, dispatch } = useApp()

  if (!error) return null

  const handleDismiss = () => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: null })
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 shadow-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <i className="ri-error-warning-line text-red-400 text-lg"></i>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
              Error
            </h3>
            <p className="mt-1 text-sm text-red-700 dark:text-red-300">
              {error}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={handleDismiss}
              className="inline-flex text-red-400 hover:text-red-600 dark:hover:text-red-200 transition-colors"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}