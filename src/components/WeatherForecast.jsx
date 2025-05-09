import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/WeatherForecast.css';

function WeatherForecast({ city }) {
    const [forecast, setForecast] = useState(null);
    const API_KEY = import.meta.env.VITE_API_KEY || '5f31b1bc5d88a35c79c821c5ce03d82c';

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
            .then((response) => {
                
                const daily = response.data.list.filter((item) =>
                    item.dt_txt.includes('12:00:00')
                );
                setForecast(daily);
            })
            .catch(() => setForecast(null));
    }, [city]);

    return (
        <div className="forecast-container">
            {forecast ? (
                forecast.map((day) => (
                    <div key={day.dt} className="forecast-card">
                        <p>{new Date(day.dt * 1000).toLocaleDateString('th-TH', { weekday: 'short' , day: 'numeric', month: 'short', year: 'numeric', })}</p>
                        <img
                            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                            alt="Weather icon"
                        />
                        <p>{day.main.temp}°C</p>
                        <p>{day.weather[0].description}</p>
                    </div>
                ))
            ) : (
                <p>Loading forecast...</p>
            )}
        </div>
    );
}

export default WeatherForecast;