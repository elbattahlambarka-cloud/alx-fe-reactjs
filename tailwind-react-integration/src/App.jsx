// src/App.jsx
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Tailwind CSS + React
        </h1>
        <p className="text-gray-600 mb-6">
          Successfully integrated Tailwind CSS with your React project!
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default App