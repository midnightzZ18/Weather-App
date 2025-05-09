import { useState, Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WeatherReport from './components/WeatherReport';
import WeatherTips from './components/WeatherTips';
import WeatherForecast from './components/WeatherForecast';
import About from './components/About';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  const [theme, setTheme] = useState('light');
  const [city, setCity] = useState('Bangkok');

  const handleSearch = (cityName) => {
    setCity(cityName);
  };

  return (
    <Router>
      <div className={`container ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} onSearch={handleSearch} />
        <main>
          <ErrorBoundary>
            <Routes>
              <Route
                path="/"
                element={
                  <div className="top-section">
                    <WeatherReport city={city} />
                    <WeatherTips city={city} />
                    <WeatherForecast city={city} />
                  </div>
                }
              />
              <Route
                path="/weather-report"
                element={
                  <div className="centered-component">
                    <WeatherReport city={city} />
                  </div>
                }
              />
              <Route
                path="/weather-forecast"
                element={
                  <div className="full-width-component">
                    <WeatherForecast city={city} />
                  </div>
                }
              />
              <Route
                path="/weather-tips"
                element={
                  <div className="centered-component">
                    <WeatherTips city={city} />
                  </div>
                }
              />
              <Route
                path="/about"
                element={
                  <div className="centered-component">
                    <About />
                  </div>
                }
              />
              <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;