import React, { useState, useEffect } from 'react';

const CCTV = () => {
  const locs = ['Pintu Utama', 'Lobby', 'Koridor A', 'Koridor B', 'Parkir', 'IGD', 'Farmasi', 'Tangga'];
  
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="page active">
      <div className="pg-inner">
        <div className="stat-bar">
          <div className="sbi">Total: <b>8</b></div>
          <div className="sbi">Online: <b style={{ color: 'var(--green)' }}>8</b></div>
          <div className="sbi">Offline: <b style={{ color: 'var(--red)' }}>0</b></div>
          <div className="sbi">Resolusi: <b>1080p</b></div>
        </div>
        <div className="cg-full">
          {locs.map((loc, i) => {
            const camTime = new Date(time);
            camTime.setSeconds(camTime.getSeconds() - (i % 3)); // slight dummy delay

            return (
              <div key={i} className="cf-cam">
                <div className="cf-ico">📷</div>
                <span className="cf-lb">CAM {i + 1} — {loc}</span>
                <span className="cf-tm">{camTime.toLocaleTimeString('id-ID')}</span>
                <span className="cf-lv">
                  <span className="badge b-live"><span className="ldot"></span>LIVE</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CCTV;
