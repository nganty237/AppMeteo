import { useEffect, useRef } from 'react';
import { Search, Droplets, Wind } from 'lucide-react';

function Weather() {
  const raysRef = useRef(null);

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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');

        .weather-body {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Sora', sans-serif;
          background: radial-gradient(ellipse at 30% 20%, #2d1b69 0%, #1a1040 40%, #0d0820 100%);
          padding: 2rem;
        }

        .w-card {
          width: 100%;
          max-width: 380px;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 28px;
          padding: 28px 28px 24px;
          color: #fff;
          position: relative;
          overflow: hidden;
        }

        .w-card::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(120,80,255,0.25) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .w-card::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 180px; height: 180px;
          background: radial-gradient(circle, rgba(80,160,255,0.15) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .w-search-row {
          display: flex;
          gap: 10px;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }

        .w-search-input {
          flex: 1;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: 14px;
          padding: 0 18px;
          height: 48px;
          color: #fff;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          font-weight: 300;
          letter-spacing: 0.02em;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .w-search-input::placeholder { color: rgba(255,255,255,0.35); }

        .w-search-input:focus {
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.12);
        }

        .w-search-btn {
          width: 48px; height: 48px;
          background: linear-gradient(135deg, #7c5cfc, #5b8df6);
          border: none;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: transform 0.15s, opacity 0.15s;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(124,92,252,0.4);
          color: #fff;
        }

        .w-search-btn:hover { opacity: 0.9; }
        .w-search-btn:active { transform: scale(0.92); }

        .w-icon-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .w-sun {
          width: 100px; height: 100px;
          position: relative;
          animation: floatSun 4s ease-in-out infinite;
        }

        .w-sun-core {
          width: 60px; height: 60px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #FFE066, #FFA500);
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 30px rgba(255,180,0,0.5), 0 0 60px rgba(255,140,0,0.3);
          animation: pulseSun 3s ease-in-out infinite;
        }

        @keyframes floatSun {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes pulseSun {
          0%, 100% { box-shadow: 0 0 30px rgba(255,180,0,0.5), 0 0 60px rgba(255,140,0,0.3); }
          50% { box-shadow: 0 0 40px rgba(255,180,0,0.7), 0 0 80px rgba(255,140,0,0.4); }
        }

        @keyframes rayPulse {
          0%, 100% { opacity: 0.7; height: 10px; }
          50% { opacity: 1; height: 13px; }
        }

        .w-temp-block {
          text-align: center;
          position: relative;
          z-index: 1;
          margin-bottom: 28px;
        }

        .w-temp-value {
          font-family: 'Space Mono', monospace;
          font-size: 80px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -3px;
          color: #fff;
        }

        .w-temp-unit {
          font-size: 32px;
          font-weight: 400;
          vertical-align: super;
          margin-left: 2px;
          letter-spacing: 0;
          opacity: 0.8;
        }

        .w-city {
          font-size: 26px;
          font-weight: 500;
          letter-spacing: 0.01em;
          margin-top: 4px;
          color: #fff;
        }

        .w-condition {
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-top: 6px;
        }

        .w-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .w-stats {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          position: relative;
          z-index: 1;
        }

        .w-stat-sep {
          width: 1px;
          background: rgba(255,255,255,0.1);
          margin: 4px 0;
        }

        .w-stat {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 16px;
          transition: background 0.2s;
          cursor: default;
        }

        .w-stat:hover { background: rgba(255,255,255,0.06); }

        .w-stat-icon {
          width: 38px; height: 38px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .w-stat-icon.blue { background: rgba(100,160,255,0.18); color: #82b4ff; }
        .w-stat-icon.teal { background: rgba(80,220,180,0.18); color: #5ee8c0; }

        .w-stat-val {
          font-family: 'Space Mono', monospace;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.2;
          color: #fff;
        }

        .w-stat-val span {
          font-size: 10px;
          font-weight: 400;
          opacity: 0.7;
          margin-left: 1px;
        }

        .w-stat-label {
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-top: 2px;
        }
      `}</style>

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
    </>
  );
}

export default Weather;