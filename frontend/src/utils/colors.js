// Color mapping for sticky notes
export const noteColors = {
  yellow: {
    name: 'yellow',
    hex: '#FEF3C7',
    bgClass: 'bg-yellow-200 dark:bg-yellow-300',
    textClass: 'text-gray-800 dark:text-gray-900',
    borderClass: 'border-yellow-300',
    displayClass: 'bg-yellow-200'
  },
  blue: {
    name: 'blue',
    hex: '#DBEAFE',
    bgClass: 'bg-blue-200 dark:bg-blue-300',
    textClass: 'text-gray-800 dark:text-gray-900',
    borderClass: 'border-blue-300',
    displayClass: 'bg-blue-200'
  },
  pink: {
    name: 'pink',
    hex: '#FCE7F3',
    bgClass: 'bg-pink-200 dark:bg-pink-300',
    textClass: 'text-gray-800 dark:text-gray-900',
    borderClass: 'border-pink-300',
    displayClass: 'bg-pink-200'
  },
  green: {
    name: 'green',
    hex: '#D1FAE5',
    bgClass: 'bg-green-200 dark:bg-green-300',
    textClass: 'text-gray-800 dark:text-gray-900',
    borderClass: 'border-green-300',
    displayClass: 'bg-green-200'
  },
  purple: {
    name: 'purple',
    hex: '#E9D5FF',
    bgClass: 'bg-purple-200 dark:bg-purple-300',
    textClass: 'text-gray-800 dark:text-gray-900',
    borderClass: 'border-purple-300',
    displayClass: 'bg-purple-200'
  }
}

// Helper function to get color by name or hex
export const getColorConfig = (colorValue) => {
  // If it's a color name, return directly
  if (noteColors[colorValue]) {
    return noteColors[colorValue]
  }
  
  // If it's a hex value, find matching color
  const colorEntry = Object.values(noteColors).find(color => color.hex === colorValue)
  if (colorEntry) {
    return colorEntry
  }
  
  // Default to yellow if no match found
  return noteColors.yellow
}

// Helper function to get all color options for UI
export const getColorOptions = () => {
  return Object.values(noteColors)
}

// Helper function to get color classes for a note
export const getNoteColorClasses = (colorValue) => {
  const config = getColorConfig(colorValue)
  return {
    background: config.bgClass,
    text: config.textClass,
    border: config.borderClass
  }
}