function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🎨 Tailwind CSS + React
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Successfully integrated Tailwind CSS with React!
          </p>
          <div className="w-24 h-2 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Setup</h3>
            <p className="text-gray-600">Quick integration with Vite and React using the new @tailwindcss/vite plugin.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Utility-First</h3>
            <p className="text-gray-600">Build complex designs directly in your JSX with utility classes.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Responsive</h3>
            <p className="text-gray-600">Easily create responsive designs with built-in breakpoints.</p>
          </div>
        </div>

        {/* Demo Components */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Tailwind CSS Demo
          </h2>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Primary Button
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Success Button
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Danger Button
            </button>
          </div>

          {/* Form Elements */}
          <div className="max-w-md mx-auto space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea 
                placeholder="Type your message here..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Alert */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-center">
          <p className="text-white text-lg font-semibold">
            ✅ Tailwind CSS is successfully integrated and working!
          </p>
          <p className="text-blue-100 mt-2">
            You can now start building beautiful React components with utility-first CSS.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App