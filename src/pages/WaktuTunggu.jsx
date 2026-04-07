import React, { useContext, useState } from 'react';
import { DashboardContext } from '../context/DashboardContext';

const WaktuTunggu = () => {
  const { waktuTunggu, waitHistory } = useContext(DashboardContext);
  
  // State for real-time RFID levels at each station
  const [rfidLevels, setRfidLevels] = useState([12, 18, 5, 14]);

  const updateRfid = (idx, val) => {
    const newLevels = [...rfidLevels];
    newLevels[idx] = val;
    setRfidLevels(newLevels);
  };

  const getWaitColor = (t) => {
    if (t < 25) return 'var(--green)';
    if (t <= 30) return 'var(--amber)';
    return 'var(--red)';
  };

  const getWaitLabel = (t) => {
    if (t < 25) return 'OPTIMAL';
    if (t <= 30) return 'PERINGATAN';
    return 'KRITIS';
  };

  const getWaitBadge = (t) => {
    if (t < 25) return 'b-green';
    if (t <= 30) return 'b-amber';
    return 'b-red';
  };

  const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const layananData = [
    { name: 'Ruang Tunggu Loket', data: waitHistory.map(v => Math.round(v * 0.5)), color: 'var(--cyan)', icon: '🎫' },
    { name: 'Ruang Tunggu Klinik', data: waitHistory.map(v => Math.round(v * 0.8)), color: 'var(--green)', icon: '🏥' },
    { name: 'Pelayanan Dokter', data: waitHistory.map(v => Math.round(v * 1.2)), color: 'var(--amber)', icon: '👨‍⚕️' },
    { name: 'Farmasi', data: waitHistory.map(v => Math.round(v * 0.9)), color: 'var(--red)', icon: '💊' }
  ];

  return (
    <div className="page active">
      <div className="pg-inner">
        <div className="stat-bar">
          <div className="sbi">Status Poliklinik: <b style={{ color: 'var(--green)' }}>AKTIF</b></div>
          <div className="sbi">Kapasitas Gedung: <b>78%</b></div>
          <div className="sbi">Total Tag RFID Terbaca: <b>{rfidLevels.reduce((a,b) => a+b, 0)}</b></div>
        </div>

        <div className="charts-2col" style={{ gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {layananData.map((svc, idx) => {
            const minVal = Math.min(...svc.data) * 0.8;
            const maxVal = Math.max(...svc.data) * 1.2;
            const W = 400;
            const H = 140;
            const padding = 20;
            const bottomPadding = 25;
            const chartHeight = H - padding - bottomPadding;
            
            const points = svc.data.map((t, i) => 
              `${Math.round(i * (W / (svc.data.length - 1)))},${Math.round(H - bottomPadding - ((t - minVal) / (maxVal - minVal)) * chartHeight)}`
            ).join(' ');

            return (
              <div key={idx} className="cc" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div className="cc-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>{svc.icon}</span> Tren {svc.name}
                  </div>
                  <div className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--muted)', fontSize: '10px' }}>7 HARI TERAKHIR</div>
                </div>

                <div style={{ display: 'flex', gap: '25px', alignItems: 'stretch', height: '180px' }}>
                  {/* RFID SLIDER SIDEBAR */}
                  <div style={{ width: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '10px 4px', border: '1px solid var(--bord)' }}>
                    <div style={{ fontSize: '8px', fontWeight: '800', color: svc.color, textAlign: 'center', lineHeight: '1' }}>RFID<br/>LIVE</div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                      <input 
                        type="range" 
                        min="0" max="40" 
                        orient="vertical"
                        value={rfidLevels[idx]} 
                        onChange={(e) => updateRfid(idx, parseInt(e.target.value))}
                        style={{ 
                          WebkitAppearance: 'slider-vertical', 
                          appearance: 'slider-vertical',
                          writingMode: 'bt-lr',
                          width: '12px', 
                          height: '90px',
                          cursor: 'pointer',
                          margin: 0,
                          padding: 0
                        }} 
                      />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ 
                        fontSize: '15px', 
                        fontWeight: '900', 
                        color: rfidLevels[idx] > 25 ? 'var(--red)' : '#fff', 
                        fontFamily: 'JetBrains Mono', 
                        lineHeight: '1',
                        transition: 'color 0.2s ease' 
                      }}>
                        {rfidLevels[idx]}
                      </div>
                      <div style={{ 
                        fontSize: '7px', 
                        color: rfidLevels[idx] > 25 ? 'var(--red)' : 'var(--muted)', 
                        textTransform: 'uppercase', 
                        marginTop: '2px',
                        fontWeight: rfidLevels[idx] > 25 ? 'bold' : 'normal'
                      }}>
                        {rfidLevels[idx] > 25 ? 'OVERLOAD' : 'Tags'}
                      </div>
                    </div>
                  </div>

                    {/* CHART AREA */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ flex: 1, position: 'relative' }}>
                        <svg viewBox={`-5 -20 ${W + 10} ${H + 30}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                          <defs>
                            <linearGradient id={`gradWait${idx}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={svc.color} stopOpacity="0.25" />
                              <stop offset="100%" stopColor={svc.color} stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          
                          {/* Background Grid Lines (Horizontal) */}
                          <line x1="0" y1={H - bottomPadding} x2={W} y2={H - bottomPadding} stroke="var(--bord)" strokeWidth="1" />
                          <line x1="0" y1={0} x2={W} y2={0} stroke="var(--bord)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                          
                          {/* Fill Area */}
                          <polyline points={`0,${H - bottomPadding} ${points} ${W},${H - bottomPadding}`} fill={`url(#gradWait${idx})`} stroke="none" />
                          
                          {/* Trend Line */}
                          <polyline points={points} fill="none" stroke={svc.color} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
                          
                          {/* Points, Numbers, and Days Labels */}
                          {svc.data.map((t, i) => {
                            const cx = Math.round(i * (W / (svc.data.length - 1)));
                            const cy = Math.round(H - bottomPadding - ((t - minVal) / (maxVal - minVal)) * chartHeight);
                            return (
                              <g key={i}>
                                {/* Day Labels (ALIGNED) */}
                                <text 
                                  x={cx} 
                                  y={H} 
                                  fill="var(--muted)" 
                                  fontSize="9" 
                                  textAnchor={i === 0 ? "start" : i === svc.data.length - 1 ? "end" : "middle"} 
                                  fontWeight="700" 
                                  fontFamily="JetBrains Mono"
                                >
                                  {days[i]}
                                </text>

                                {/* Points and Numbers */}
                                <circle cx={cx} cy={cy} r="4.5" fill="var(--bg)" stroke={svc.color} strokeWidth="2.5" />
                                <text 
                                  x={cx} 
                                  y={cy - 12} 
                                  fill="#fff" 
                                  fontSize="11" 
                                  textAnchor={i === 0 ? "start" : i === svc.data.length - 1 ? "end" : "middle"} 
                                  fontWeight="800" 
                                  fontFamily="JetBrains Mono"
                                >
                                  {t}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      </div>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WaktuTunggu;
