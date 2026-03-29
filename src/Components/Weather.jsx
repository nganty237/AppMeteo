import { useRef, useState, useEffect, useCallback } from 'react';
import { Search, Droplets, Wind, Sun, Cloud, CloudRain, CloudDrizzle, CloudLightning, Snowflake, CloudFog } from 'lucide-react';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const inputRef = useRef();

  const search = useCallback(async (city, lat = null, lon = null) => {
    if (!city && lat === null && lon === null) return;
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      
      if (lat !== null && lon !== null) {
        url += `&lat=${lat}&lon=${lon}`;
      } else {
        url += `&q=${city}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: (data.wind.speed * 3.6).toFixed(1),
          temperature: Math.floor(data.main.temp),
          location: data.name,
          description: data.weather[0].description,
          icon: data.weather[0].icon
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo :", error);
    }
  }, []);

  const renderWeatherIcon = (iconCode) => {
    const iconProps = { size: 100, strokeWidth: 1.5, className: "w-main-icon" };
    
    switch (iconCode) {
      case '01d':
      case '01n':
        return <Sun {...iconProps} className="w-main-icon sun-color" />;
      case '02d':
      case '02n':
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return <Cloud {...iconProps} className="w-main-icon cloud-color" />;
      case '09d':
      case '09n':
        return <CloudDrizzle {...iconProps} className="w-main-icon rain-color" />;
      case '10d':
      case '10n':
        return <CloudRain {...iconProps} className="w-main-icon rain-color" />;
      case '11d':
      case '11n':
        return <CloudLightning {...iconProps} className="w-main-icon lightning-color" />;
      case '13d':
      case '13n':
        return <Snowflake {...iconProps} className="w-main-icon snow-color" />;
      case '50d':
      case '50n':
        return <CloudFog {...iconProps} className="w-main-icon fog-color" />;
      default:
        return <Sun {...iconProps} className="w-main-icon sun-color" />;
    }
  };

  const getWeatherTheme = (iconCode) => {
    if (!iconCode) return 'default';
    const mainCode = iconCode.substring(0, 2);
    switch (mainCode) {
      case '01': return 'sunny';
      case '02':
      case '03':
      case '04': return 'cloudy';
      case '09':
      case '10':
      case '11': return 'rainy';
      case '13': return 'snowy';
      default: return 'default';
    }
  };

  const getTempColor = (temp) => {
    if (temp >= 30) return '#f97316';
    if (temp >= 20) return '#fbbf24'; 
    if (temp >= 10) return '#60a5fa'; 
    return '#93c5fd'; 
  };

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            await search(null, latitude, longitude);
          },
          async (error) => {
            console.warn("Géolocalisation refusée ou non disponible :", error);
            await search("Douala"); // Fallback
          }
        );
      } else {
        await search("Douala"); // Fallback
      }
    };
    
    fetchDefaultWeather();
  }, [search]);

  return (
    <div className={`weather-body ${weatherData ? getWeatherTheme(weatherData.icon) : 'default'}`}>
      <div className="w-card">
        <h1 className="w-app-title">METEO</h1>

        <div className="w-search-row">
          <input
            ref={inputRef}
            type="text"
            className="w-search-input"
            placeholder="Rechercher une ville..."
          />
          <button className="w-search-btn" onClick={() => {
            const city = inputRef.current.value;
            if (city) {
              search(city);
            } else {
              // Si vide, on tente la géolocalisation
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) => search(null, position.coords.latitude, position.coords.longitude),
                  () => alert("Impossible de récupérer la position")
                );
              }
            }
          }}>
            <Search size={18} strokeWidth={2.5} />
          </button>
        </div>

        {weatherData ? (
          <div className="w-fade-in">
            <div className="w-icon-wrap">
              {renderWeatherIcon(weatherData.icon)}
            </div>

            <div className="w-temp-block">
              <div className="w-temp-value" style={{ color: getTempColor(weatherData.temperature) }}>
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
          </div>
        ) : (
          <div className="w-loading">RECUPERATION DES DONNEES...</div>
        )}
      </div>
    </div>
  );
}

export default Weather;