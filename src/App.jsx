function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Tailwind CSS + React
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Tailwind CSS is successfully integrated!
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Test Button
          </button>
        </div>
      </div>
    </div>
  )
}

export default App