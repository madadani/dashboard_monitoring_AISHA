import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';

const Pasien = () => {
  const { pasienWk, depts } = useContext(DashboardContext);
  
  const totalHariIni = pasienWk[6];
  const psData = [
    { l: 'Total Pasien', v: totalHariIni, s: '+4 dari kemarin', sc: '#4ade80' },
    { l: 'Rawat Inap', v: Math.floor(totalHariIni * 0.27), s: '3 kamar tersisa', sc: '#a78bfa' },
    { l: 'Rawat Jalan', v: Math.floor(totalHariIni * 0.73), s: 'Antrian: 12', sc: '#34d399' },
    { l: 'Pasien Kritis', v: 5, s: 'Kondisi stabil', sc: '#fbbf24' },
  ];

  const maxWk = Math.max(...pasienWk);
  const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  
  const generateBigSparkline = (data, color) => {
    const min = Math.min(...data) * 0.8;
    const max = Math.max(...data) * 1.1;
    const w = 400;
    const h = 80;
    const points = data.map((val, i) => `${(i / (data.length - 1)) * w},${h - ((val - min) / (max - min)) * h}`).join(' ');
    
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height: '80px', overflow: 'visible' }}>
          <defs>
            <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline points={`0,${h} ${points} ${w},${h}`} fill={`url(#grad-${color.replace('#', '')})`} stroke="none" />
          <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          {data.map((val, i) => (
            <g key={i}>
              <circle cx={(i / (data.length - 1)) * w} cy={h - ((val - min) / (max - min)) * h} r="4" fill="var(--bg)" stroke={color} strokeWidth="2" />
              <text x={(i / (data.length - 1)) * w} y={h - ((val - min) / (max - min)) * h - 10} fill="var(--text2)" fontSize="10" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{val}</text>
            </g>
          ))}
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
           {days.map(d => <span key={d} style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace" }}>{d}</span>)}
        </div>
      </div>
    );
  };
  
  const maxDept = Math.max(...depts.map(d => d.v));

  return (
    <div className="page active">
      <div className="pg-inner">
        <div className="ps-stats">
          {psData.map((p, i) => (
            <div key={i} className="ps-sc">
              <div className="ps-v" style={{ color: 'var(--cyan)' }}>{p.v}</div>
              <div className="ps-l">{p.l}</div>
              <div className="ps-ch" style={{ color: p.sc }}>{p.s}</div>
            </div>
          ))}
        </div>
        <div className="charts-2col">
          <div className="cc" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="cc-title" style={{ marginBottom: '0' }}>Tren Pasien 7 Hari Terakhir</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px', flex: 1, padding: '10px 0' }}>
              {/* Rawat Jalan */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 'bold' }}>Rawat Jalan</span>
                </div>
                {generateBigSparkline(pasienWk.map(v => Math.floor(v * 0.73)), '#34d399')}
              </div>

              {/* Rawat Inap */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', paddingTop: '10px', borderTop: '1px dashed var(--bord)' }}>
                  <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 'bold' }}>Rawat Inap</span>
                </div>
                {generateBigSparkline(pasienWk.map(v => Math.floor(v * 0.27)), '#a78bfa')}
              </div>
            </div>
          </div>
          <div className="cc">
            <div className="cc-title">Per Departemen</div>
            <div className="dept-list">
              {depts.map((d, i) => (
                <div key={i} className="di">
                  <span className="d-nm">{d.n}</span>
                  <div className="d-bw">
                    <div className="d-bf" style={{ width: `${Math.round((d.v / maxDept) * 100)}%` }}></div>
                  </div>
                  <span className="d-vl">{d.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pasien;
