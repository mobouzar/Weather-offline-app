import React, { useState } from 'react';

import { fetchWeather } from './api/fetchWeather';
import './App.css';

const App = () => {
    const [item, setItem] = useState('');
    const [weather, setWeather] = useState({});
    const [errorHandler, setErrorHandler] = useState('');

	const search = async ( event ) => {
		if (event.key === "Enter") {
            try {
                const data = await fetchWeather(item);
                setWeather(data);
                setErrorHandler('');
            } catch (error) {
                setErrorHandler(error);
                setWeather({});
            }
		}
	};

    return (
        <div className="container">
            <input
                type="text"
                placeholder="Search..."
                className="search"
                value={item}
                onChange={(event) => setItem(event.target.value)}
                onKeyPress={search}
            />
            {errorHandler && (
                <div className="city">
                    <h2 className="city-name">
                        Please make sure to enter a valid city!
                    </h2>
                </div>
            )}
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img
                            className="city-icon"
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                        />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
