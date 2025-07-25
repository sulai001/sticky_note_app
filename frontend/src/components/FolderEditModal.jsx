import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

// Default folder colors
const DEFAULT_FOLDER_COLORS = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Orange', value: '#F59E0B' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Teal', value: '#14B8A6' }
]

export default function FolderEditModal({ isOpen, onClose, folder }) {
    const { updateFolder, deleteFolder, refreshData } = useApp()
    const [folderName, setFolderName] = useState('')
    const [selectedColor, setSelectedColor] = useState(DEFAULT_FOLDER_COLORS[0].value)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    useEffect(() => {
        if (isOpen && folder) {
            setFolderName(folder.name)
            setSelectedColor(folder.color || DEFAULT_FOLDER_COLORS[0].value)
        }
    }, [isOpen, folder])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!folderName.trim()) {
            return
        }

        try {
            await updateFolder(folder._id, {
                name: folderName.trim(),
                color: selectedColor
            })
            await refreshData()
            handleClose()
        } catch (error) {
            console.error('Error updating folder:', error)
        }
    }

    const handleDelete = async () => {
        try {
            await deleteFolder(folder._id)
            await refreshData()
            handleClose()
        } catch (error) {
            console.error('Error deleting folder:', error)
        }
    }

    const handleClose = () => {
        setFolderName('')
        setSelectedColor(DEFAULT_FOLDER_COLORS[0].value)
        setShowDeleteConfirm(false)
        onClose()
    }

    if (!isOpen || !folder) return null

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Edit Folder
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Modify folder settings
                            </p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <i className="ri-close-line"></i>
                        </button>
                    </div>

                    {!showDeleteConfirm ? (
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
                                    maxLength={50}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Folder Color
                                </label>
                                <div className="grid grid-cols-4 gap-3">
                                    {DEFAULT_FOLDER_COLORS.map((color) => (
                                        <button
                                            key={color.value}
                                            type="button"
                                            onClick={() => setSelectedColor(color.value)}
                                            className={`w-12 h-12 rounded-full transition-all duration-200 flex items-center justify-center ${selectedColor === color.value
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
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <i className="ri-delete-bin-line mr-2"></i>
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                                <i className="ri-delete-bin-line text-2xl text-red-600 dark:text-red-400"></i>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Delete Folder
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Are you sure you want to delete "{folder.name}"? This action cannot be undone and all notes in this folder will be moved to "All Notes".
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Delete Folder
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}