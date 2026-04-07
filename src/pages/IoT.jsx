import React, { useContext, useState, useEffect } from 'react';
import { DashboardContext } from '../context/DashboardContext';

const IoT = () => {
  const { iot, toggleIoT } = useContext(DashboardContext);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const onCount = iot.filter(d => d.on).length;
  const offCount = iot.length - onCount;

  return (
    <div className="page active">
      <div className="pg-inner">
        <div className="stat-bar">
          <div className="sbi">Total: <b>{iot.length}</b></div>
          <div className="sbi">Aktif: <b style={{ color: 'var(--green)' }}>{onCount}</b></div>
          <div className="sbi">Nonaktif: <b style={{ color: 'var(--muted)' }}>{offCount}</b></div>
        </div>
        
        <div className="ig-full">
          {iot.map((d, i) => {
            const itemTime = new Date(time);
            itemTime.setMinutes(itemTime.getMinutes() - (i * 2)); // deterministic dummy delay
            
            return (
              <div key={i} className={`ic-full ${d.on ? 'on' : 'off'}`}>
                <div className="ic-ico">{d.i}</div>
                <div className="ic-nm">{d.n}</div>
                <div className="ic-loc">📍 {d.l}</div>
                <button className={`ic-btn ${d.on ? 'on' : 'off'}`} onClick={() => toggleIoT(i)}>
                  {d.on ? '● ON' : '○ OFF'}
                </button>
                <div className="ic-tm">{itemTime.toLocaleTimeString('id-ID')}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IoT;
