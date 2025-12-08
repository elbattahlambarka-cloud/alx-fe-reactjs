// src/App.jsx
import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/FormikForm';
import './App.css';

function App() {
  const [activeForm, setActiveForm] = useState('controlled');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-16">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveForm('controlled')}
                className={`px-4 py-2 rounded-lg font-medium ${activeForm === 'controlled' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Controlled Components
              </button>
              <button
                onClick={() => setActiveForm('formik')}
                className={`px-4 py-2 rounded-lg font-medium ${activeForm === 'formik' ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Formik Form
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Form Container */}
      <div className="py-8">
        {activeForm === 'controlled' ? <RegistrationForm /> : <FormikForm />}
      </div>

      {/* Comparison Info */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Form Handling Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-700 mb-2">Controlled Components</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Manual state management with useState</li>
                <li>• Custom validation logic</li>
                <li>• More boilerplate code</li>
                <li>• Full control over form behavior</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-700 mb-2">Formik</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Built-in state management</li>
                <li>• Integrated validation with Yup</li>
                <li>• Less boilerplate code</li>
                <li>• Built-in form handling utilities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;