import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DashboardContext } from '../context/DashboardContext';

const Header = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('id-ID'));
  const location = useLocation();
  const isDashboard = location.pathname === '/';
  const { theme, toggleTheme } = useContext(DashboardContext);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('id-ID'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/tandon': return { title: '💧 Monitoring Tandon Air', sub: 'Auto-refresh setiap 5 detik' };
      case '/cctv': return { title: '📹 Pemantau CCTV', sub: '8 kamera aktif' };
      case '/pasien': return { title: '🏥 Grafik Pasien', sub: 'Statistik pasien rumah sakit' };
      case '/iot': return { title: '⚡ Kontrol IoT', sub: 'Panel kendali perangkat' };
      case '/suhu': return { title: '🌡️ Monitor Suhu', sub: '8 ruangan terpantau' };
      case '/waktu-tunggu': return { title: '⏳ Pasien Tracking RFID', sub: 'Analisis rata-rata mingguan' };
      default: return { title: 'Smart Monitoring Dashboard RSSG', sub: 'IoT • CCTV • Pasien • Suhu' };
    }
  };

  const { title, sub } = getPageTitle();

  return (
    <div className="hdr">
      <div className="hdr-l">
        {isDashboard ? (
          <>
            <div className="logo-container">
              <img 
                src="/logo_small.png" 
                alt="Logo RSSG" 
                className="main-logo" 
                fetchPriority="high"
                decoding="async"
                onError={(e) => e.target.src = "https://placehold.co/40x40?text=RSSG"} 
              />
            </div>
            <div>
              <div className="site-title">{title}</div>
              <div className="site-sub">{sub}</div>
            </div>
          </>
        ) : (
          <>
            <Link to="/" className="back-btn" style={{textDecoration: 'none'}}>← Kembali</Link>
            <div style={{ marginLeft: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src="/logo_small.png" 
                alt="Logo RSSG" 
                fetchPriority="high" 
                style={{ width: '24px', height: '24px', borderRadius: '4px' }} 
                onError={(e) => e.target.style.display = 'none'} 
              />
              <div>
                <div className="site-title">{title}</div>
                <div className="site-sub">{sub}</div>
              </div>
            </div>
          </>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={toggleTheme}
          title="Toggle Dark/Light Mode"
          style={{
            background: 'var(--surf2)',
            border: '1px solid var(--bord)',
            color: 'var(--text2)',
            cursor: 'pointer',
            padding: '4px 12px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            fontWeight: '600',
            fontFamily: "'Space Grotesk', sans-serif",
            transition: 'all 0.3s'
          }}
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
        <div className="clock">{time}</div>
      </div>
    </div>
  );
};

export default Header;
