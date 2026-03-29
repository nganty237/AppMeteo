import { useEffect, useRef } from 'react';
import { Search, Droplets, Wind } from 'lucide-react';

function Weather() {
  const raysRef = useRef(null);

  const rechearch = async () => {
    try {
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=
      ${import.meta.env.VITTE_API_ID}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!raysRef.current) return;
    raysRef.current.innerHTML = '';
    const count = 8;
    for (let i = 0; i < count; i++) {
      const ray = document.createElement('div');
      ray.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        top: 50%;
        left: 50%;
        transform-origin: 0 0;
        transform: rotate(${i * (360 / count)}deg);
      `;
      const inner = document.createElement('div');
      inner.style.cssText = `
        display: block;
        width: 3px;
        height: 11px;
        background: #FFD000;
        border-radius: 2px;
        margin-left: -1.5px;
        margin-top: -50px;
        opacity: 0.85;
        animation: rayPulse 3s ease-in-out ${i * 0.15}s infinite;
      `;
      ray.appendChild(inner);
      raysRef.current.appendChild(ray);
    }
  }, []);

  return (
    <div className="weather-body">
      <div className="w-card">

        {/* Search */}
        <div className="w-search-row">
          <input
            type="text"
            className="w-search-input"
            placeholder="Rechercher une ville..."
          />
          <button className="w-search-btn">
            <Search size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Sun icon */}
        <div className="w-icon-wrap">
          <div className="w-sun">
            <div ref={raysRef} style={{ position: 'absolute', width: '100%', height: '100%' }} />
            <div className="w-sun-core" />
          </div>
        </div>

        {/* Temperature */}
        <div className="w-temp-block">
          <div className="w-temp-value">
            16<span className="w-temp-unit">°C</span>
          </div>
          <div className="w-city">Douala</div>
          <div className="w-condition">Ciel dégagé</div>
        </div>

        <div className="w-divider" />

        {/* Stats */}
        <div className="w-stats">
          <div className="w-stat">
            <div className="w-stat-icon blue">
              <Droplets size={18} strokeWidth={2} />
            </div>
            <div>
              <div className="w-stat-val">91<span>%</span></div>
              <div className="w-stat-label">Humidité</div>
            </div>
          </div>

          <div className="w-stat-sep" />

          <div className="w-stat">
            <div className="w-stat-icon teal">
              <Wind size={18} strokeWidth={2} />
            </div>
            <div>
              <div className="w-stat-val">3.6<span>km/h</span></div>
              <div className="w-stat-label">Vent</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Weather;