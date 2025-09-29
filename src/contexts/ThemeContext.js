import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('app-theme');
    return savedTheme || 'dark';
  });

  const [accentColor, setAccentColor] = useState(() => {
    const savedColor = localStorage.getItem('app-accent-color');
    return savedColor || '#4fc3f7';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('app-accent-color', accentColor);
    document.documentElement.style.setProperty('--accent-color', accentColor);
  }, [accentColor]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const themes = {
    dark: {
      name: '深色主题',
      primary: '#0f0f23',
      secondary: '#1a1a2e',
      accent: accentColor,
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.8)'
    },
    light: {
      name: '浅色主题',
      primary: '#f8f9fa',
      secondary: '#ffffff',
      accent: accentColor,
      text: '#333333',
      textSecondary: 'rgba(0, 0, 0, 0.7)'
    }
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    accentColor,
    setAccentColor,
    currentTheme: themes[theme]
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};