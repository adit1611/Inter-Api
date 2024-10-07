import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserList from './Components/UserList';
import UserForm from './Components/UserForm';

function App() {
  const [theme, setTheme] = useState('light'); // State for theme

  // Switch theme between light and dark
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Apply the theme to the document body
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
        {/* Theme Switcher */}
        <div className="flex justify-start p-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>

        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/create-user" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
