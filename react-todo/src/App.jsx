// src/App.jsx
import TodoList from './components/TodoList';

function App() {
  return (
    <div style={styles.container}>
      <TodoList />
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#e5e7eb',
    padding: '2rem',
  },
};

export default App;