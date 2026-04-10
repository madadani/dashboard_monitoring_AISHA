import React, { useState, useEffect } from 'react';
import { initialCctv } from '../data';

const CCTV = () => {
  const [time, setTime] = useState(new Date());
  const [selectedCam, setSelectedCam] = useState(null);
  const [offlineCams, setOfflineCams] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const closeCam = () => setSelectedCam(null);

  const renderStream = (cam, isFull = false) => {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        {!isFull && (
          <div className="rec-box">
            <div className="rec-dot"></div>
            REC
          </div>
        )}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="cam-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src={`${import.meta.env.BASE_URL}${cam.v}`} type="video/mp4" />
        </video>
      </div>
    );
  };

  const onlineCount = initialCctv.filter(c => c.v).length;

  return (
    <div className="page active">
      <div className="pg-inner">
        <div className="stat-bar">
          <div className="sbi">Total: <b>{initialCctv.length}</b></div>
          <div className="sbi">Online: <b style={{ color: 'var(--green)' }}>{onlineCount}</b></div>
          <div className="sbi">Offline: <b style={{ color: 'var(--red)' }}>{initialCctv.length - onlineCount}</b></div>
          <div className="sbi">Resolusi: <b>1080p</b></div>
        </div>

        <div className="cg-full">
          {initialCctv.map((cam, i) => {
            const camTime = new Date(time);
            camTime.setSeconds(camTime.getSeconds() - (i % 3)); 

            return (
              <div key={cam.id} className="cf-cam" onClick={() => setSelectedCam(cam)}>
                {renderStream(cam)}
                <span className="cf-lb">CAM {cam.id} — {cam.n}</span>
                <span className="cf-tm">{camTime.toLocaleTimeString('id-ID')}</span>
                <span className="cf-lv">
                   <span className={`badge ${offlineCams[cam.id] ? 'b-red' : 'b-live'}`}>
                     <span className="ldot"></span>{offlineCams[cam.id] ? 'OFFLINE' : 'LIVE'}
                   </span>
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
            {renderStream(selectedCam, true)}
            <span className="cf-lb" style={{ fontSize: '14px', bottom: '20px', left: '25px', color: '#fff', opacity: 0.6 }}>
              CAM {selectedCam.id} — {selectedCam.n}
            </span>
            <span className="cf-tm" style={{ fontSize: '14px', bottom: '20px', right: '25px', color: '#fff', opacity: 0.6 }}>
              {time.toLocaleTimeString('id-ID')}
            </span>
            <span className="cf-lv" style={{ top: '20px', right: '20px' }}>
              <span className={`badge ${offlineCams[selectedCam.id] ? 'b-red' : 'b-live'}`} style={{ padding: '6px 12px', fontSize: '12px' }}>
                <span className="ldot" style={{ width: '8px', height: '8px' }}></span>
                {offlineCams[selectedCam.id] ? 'OFFLINE' : 'LIVE - 1080p'}
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CCTV;
