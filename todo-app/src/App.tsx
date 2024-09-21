// src/App.tsx
import React from 'react';
import TodoApp from './TodoApp';   // Import the TodoApp component
import ThemeProvider, { useTheme } from './ThemeContext';
import './styles.css';  // Import the CSS file

// Main App Component
const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={theme === 'light' ? 'light-theme' : 'dark-theme'}>
      <header>
        <h1>Todo App with Hooks</h1>
        {/* Toggle Theme Button */}
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </header>
      
      <div className="todo-container">
        <TodoApp />
      </div>
    </div>
  );
};

// Root App Component
const RootApp: React.FC = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default RootApp;
