/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: "#F59E0B",
                secondary: "#EF4444",
            },
            borderRadius: {
                'button': '8px',
            },
            fontFamily: {
                'pacifico': ['Pacifico', 'cursive'],
            }
        },
    },
    safelist: [
        // Ensure primary and secondary color classes are never purged
        'bg-primary',
        'text-primary',
        'border-primary',
        'ring-primary',
        'hover:bg-primary/90',
        'hover:text-primary/80',
        'focus:ring-primary',
        'bg-secondary',
        'text-secondary',
        'border-secondary',
        // Ensure note color classes are never purged
        'bg-yellow-200',
        'bg-yellow-300',
        'bg-blue-200',
        'bg-blue-300',
        'bg-pink-200',
        'bg-pink-300',
        'bg-green-200',
        'bg-green-300',
        'bg-purple-200',
        'bg-purple-300',
        'text-gray-800',
        'text-gray-900',
        'border-yellow-300',
        'border-blue-300',
        'border-pink-300',
        'border-green-300',
        'border-purple-300',
    ],
    plugins: [],
}