// src/components/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import reactLogo from '../assets/logo-dark.png';
import reactLogo_dark from '../assets/logo-light.png';
import search_icon_light from '../assets/search-w.png';
import search_icon_dark from '../assets/search-b.png';
import toggle_light from '../assets/night.png';
import toggle_dark from '../assets/day.png';
import '../styles/App.css';

const Navbar = ({ theme, setTheme, onSearch }) => {
  const [inputCity, setInputCity] = useState('');
  const [showFeatureDropdown, setShowFeatureDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggle_mode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      onSearch(inputCity.trim());
      setInputCity('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFeatureDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header>
      <div className="navbar">
        <img
          src={theme === 'light' ? reactLogo : reactLogo_dark}
          alt="Logo"
          className="logo"
        />
        <h2>Weather Report</h2>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li className="features-dropdown" ref={dropdownRef}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowFeatureDropdown(!showFeatureDropdown);
              }}
            >
              Features
            </a>
            {showFeatureDropdown && (
              <div className="dropdown-menu">
                <NavLink
                  to="/weather-report"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={() => setShowFeatureDropdown(false)}
                >
                  Weather Report
                </NavLink>
                <NavLink
                  to="/weather-forecast"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={() => setShowFeatureDropdown(false)}
                >
                  Weather Forecast
                </NavLink>
                <NavLink
                  to="/weather-tips"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={() => setShowFeatureDropdown(false)}
                >
                  Weather Tips
                </NavLink>
              </div>
            )}
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
              About
            </NavLink>
          </li>
        </ul>
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search city"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          />
          <img
            src={theme === 'light' ? search_icon_light : search_icon_dark}
            alt="Search"
            onClick={handleSearch}
          />
        </form>
        <img
          onClick={toggle_mode}
          src={theme === 'light' ? toggle_light : toggle_dark}
          alt="Toggle Theme"
          className="toggle-icon"
        />
      </div>
    </header>
  );
};

export default Navbar;