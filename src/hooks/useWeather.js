import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY || '5f31b1bc5d88a35c79c821c5ce03d82c';

function useWeather(city) {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setWeatherData(null);
        setError(null);

        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then((res) => {
                setWeatherData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.response?.data?.message || 'Error fetching weather data');
                setLoading(false);
            });
    }, [city]);

    return { weatherData, loading, error };
}

export default useWeather;
