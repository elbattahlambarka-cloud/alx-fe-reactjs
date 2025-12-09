import React from 'react';
import TodoList from './components/TodoList';

function App() {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <TodoList />
    </div>
  );
}

export default App;