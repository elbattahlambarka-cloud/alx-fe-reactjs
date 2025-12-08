// src/App.jsx
import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm'; // Note: lowercase 'f'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          React Form Handling Comparison
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controlled Components Form */}
          <div>
            <RegistrationForm />
          </div>
          
          {/* Formik Form */}
          <div>
            <FormikForm />
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Comparison Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">Controlled Components</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Manual state management with useState</li>
                <li>• Custom validation logic</li>
                <li>• More control but more code</li>
                <li>• Good for simple forms</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-purple-600 mb-2">Formik</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Built-in form state management</li>
                <li>• Integrated validation with Yup</li>
                <li>• Less boilerplate code</li>
                <li>• Better for complex forms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;