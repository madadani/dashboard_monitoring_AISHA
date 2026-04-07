import React, { useState, useEffect } from 'react';

const CCTV = () => {
  const locs = ['Pintu Utama', 'Lobby', 'Koridor A', 'Koridor B', 'Parkir', 'IGD', 'Farmasi', 'Tangga'];
  
  const [time, setTime] = useState(new Date());
  const [selectedCam, setSelectedCam] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const closeCam = () => setSelectedCam(null);

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
            camTime.setSeconds(camTime.getSeconds() - (i % 3)); 

            return (
              <div key={i} className="cf-cam" onClick={() => setSelectedCam({ id: i + 1, loc })}>
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

      {/* Fullscreen Modal */}
      {selectedCam && (
        <div className="cam-modal-overlay" onClick={closeCam}>
          <div className="cam-modal-cnt" onClick={(e) => e.stopPropagation()}>
            <button className="cam-modal-close" onClick={closeCam}>TUTUP</button>
            <div className="cf-ico" style={{ fontSize: '100px' }}>📷</div>
            <span className="cf-lb" style={{ fontSize: '14px', bottom: '20px', left: '25px', color: '#fff', opacity: 0.6 }}>
              CAM {selectedCam.id} — {selectedCam.loc}
            </span>
            <span className="cf-tm" style={{ fontSize: '14px', bottom: '20px', right: '25px', color: '#fff', opacity: 0.6 }}>
              {time.toLocaleTimeString('id-ID')}
            </span>
            <span className="cf-lv" style={{ top: '20px', right: '20px' }}>
              <span className="badge b-live" style={{ padding: '6px 12px', fontSize: '12px' }}>
                <span className="ldot" style={{ width: '8px', height: '8px' }}></span>LIVE - 1080p
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CCTV;
