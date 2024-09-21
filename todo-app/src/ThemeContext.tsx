import React, { createContext, useState, useContext, ReactNode } from 'react';

// Create the context
const ThemeContext = createContext<any>(null);

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);

// Define props type to include children
interface ThemeProviderProps {
  children: ReactNode;
}

// Define the ThemeProvider component
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}  {/* Render children */}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
