import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/WeatherReport.css';

function WeatherReport({ city }) {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const API_KEY = import.meta.env.VITE_API_KEY || '5f31b1bc5d88a35c79c821c5ce03d82c';
    useEffect(() => {
        setWeather(null);
        setError(null);
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then((response) => {
                setWeather(response.data);
                setError(null);
            })
            .catch((err) => {
                setError(err.response?.data?.message || 'City not found or API error');
                setWeather(null);
            });
    }, [city]);

    return (
        
        <div className="weather-card">
            {error ? (
                <p className="error">Error: {error}</p>
            ) : weather ? (
                <div>
                    <h2>
                        {weather.name || 'N/A'}, {weather.sys?.country || 'N/A'}
                    </h2>
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.weather?.[0]?.icon || '10d'}@2x.png`}
                        alt="Weather icon"
                        className="weather-icon"
                    />
                    <p className="temperature">Temperature: {weather.main?.temp ?? 'N/A'}°C</p>
                    <p className="description">Weather: {weather.weather?.[0]?.description || 'N/A'}</p>
                    <p className="humidity">Humidity: {weather.main?.humidity ?? 'N/A'}%</p>
                    <p className="wind">Wind Speed: {weather.wind?.speed ?? 'N/A'} m/s</p>
                    <p className="pressure">Pressure: {weather.main?.pressure ?? 'N/A'} hPa</p>
                </div>
            ) : (
                <p className="loading">Loading weather data...</p>
            )}
        </div>
    );
}

export default WeatherReport;