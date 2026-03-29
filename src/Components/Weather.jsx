import {  useRef, useState } from 'react';
import { Search, Droplets, Wind } from 'lucide-react';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const inputRef = useRef();

  const search = async (city) => {
    if (!city) return;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          description: data.weather[0].description
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo :", error);
    }
  }

  return (
    <div className="weather-body">
      <div className="w-card">

        <div className="w-search-row">
          <input
            ref={inputRef}
            type="text"
            className="w-search-input"
            placeholder="Rechercher une ville..."
          />
          <button className="w-search-btn" onClick={() => search(inputRef.current.value)}>
            <Search size={18} strokeWidth={2.5} />
          </button>
        </div>

        {weatherData ? (
          <>
            <div className="w-icon-wrap">
              <div className="w-sun">
                <div className="w-sun-core" />
              </div>
            </div>

            <div className="w-temp-block">
              <div className="w-temp-value">
                {weatherData.temperature}<span className="w-temp-unit">°C</span>
              </div>
              <div className="w-city">{weatherData.location}</div>
              <div className="w-condition">{weatherData.description}</div>
            </div>

            <div className="w-divider" />

            <div className="w-stats">
              <div className="w-stat">
                <div className="w-stat-icon blue">
                  <Droplets size={18} strokeWidth={2} />
                </div>
                <div>
                  <div className="w-stat-val">{weatherData.humidity}<span>%</span></div>
                  <div className="w-stat-label">Humidité</div>
                </div>
              </div>

              <div className="w-stat-sep" />

              <div className="w-stat">
                <div className="w-stat-icon teal">
                  <Wind size={18} strokeWidth={2} />
                </div>
                <div>
                  <div className="w-stat-val">{weatherData.windSpeed}<span>km/h</span></div>
                  <div className="w-stat-label">Vent</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-loading">Chargement...</div>
        )}
      </div>
    </div>
  );
}

export default Weather;