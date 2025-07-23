import { useState } from 'react'
import React from 'react';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Sticky Notes App
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Count is {count}
          </button>
          <p className="mt-4 text-gray-600">
            Tailwind CSS is working! 🎉
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
