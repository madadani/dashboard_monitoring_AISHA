import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../context/DashboardContext';

const WaktuTungguCard = () => {
  const { waktuTunggu } = useContext(DashboardContext);

  const getWaitColor = (t) => {
    if (t < 25) return 'var(--green)';
    if (t <= 30) return 'var(--amber)';
    return 'var(--red)';
  };

  return (
    <div className="sec-card">
      <div className="ch">
        <div className="ct" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          <div className="ci" style={{ background: 'rgba(52,211,153,.1)' }}>🛰️</div>
          Pasien Tracking RFID
        </div>
        <span className="badge" style={{ background: 'rgba(52,211,153,.12)', color: '#34d399', border: '1px solid rgba(52,211,153,.2)', textTransform: 'uppercase' }}>Mingguan</span>
      </div>
      <div className="cb">
        <div className="stat-row" style={{ marginTop: '16px' }}>
          <div className="sc">
            <div className="sc-v" style={{ color: getWaitColor(waktuTunggu.inap) }}>{waktuTunggu.inap} m</div>
            <div className="sc-l">Avg. Rawat Inap</div>
          </div>
          <div className="sc">
            <div className="sc-v" style={{ color: getWaitColor(waktuTunggu.jalan) }}>{waktuTunggu.jalan} m</div>
            <div className="sc-l">Avg. Rawat Jalan</div>
          </div>
        </div>
        
        <div style={{ fontSize: '9px', color: 'var(--muted)', marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <span><b style={{color: 'var(--green)'}}>■</b> &lt;25m</span>
          <span><b style={{color: 'var(--amber)'}}>■</b> 25-30m</span>
          <span><b style={{color: 'var(--red)'}}>■</b> &gt;30m</span>
        </div>
      </div>
      <div className="cf">
        <span style={{ fontSize: '10px', color: 'var(--muted)' }}>Statistik Minggu Ini</span>
        <Link to="/waktu-tunggu" className="see-all">Lihat Semua →</Link>
      </div>
    </div>
  );
};

export default WaktuTungguCard;
