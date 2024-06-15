// Layout.tsx
import React, { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const DarkMode: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(
   true
  );

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode === 'true');
    }
  
  else {
   // If no preference is stored, default to dark mode
   localStorage.setItem('darkMode', 'true');
  }
 }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark text-white' : 'bg-light text-black'}`}>
      {children}
      <button className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-300 text-gray-800" onClick={toggleTheme}>
    <span>Toggle </span>    {darkMode ? '🌞' : '🌙'} {/* Sun icon for light mode, Moon icon for dark mode */}
      </button>
    </div>
  );
};

export default DarkMode;
