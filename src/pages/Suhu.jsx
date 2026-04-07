import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import { sColor, sLabel, sBadge } from '../data';

const Suhu = () => {
  const { suhu } = useContext(DashboardContext);

  const normCount = suhu.filter(s => s.t < 30).length;
  const warmCount = suhu.filter(s => s.t >= 30 && s.t < 35).length;
  const critCount = suhu.filter(s => s.t >= 35).length;

  const temps = [28, 27, 29, 31, 33, 35, 36, 38, 37, 36, 35, 34, 33, 32, 31, 30, 31, 32, 33, 35, 37, 38, 37, 36];
  const mn = 24, mx = 42, W = 800, H = 90;
  const pts = temps.map((t, i) => `${Math.round(i * (W / (temps.length - 1)))},${Math.round(H - ((t - mn) / (mx - mn)) * (H - 10) + 5)}`).join(' ');

  return (
    <div className="page active">
      <div className="pg-inner">
        <div className="stat-bar">
          <div className="sbi">Normal: <b style={{ color: 'var(--green)' }}>{normCount}</b></div>
          <div className="sbi">Hangat: <b style={{ color: 'var(--amber)' }}>{warmCount}</b></div>
          <div className="sbi">Kritis: <b style={{ color: 'var(--red)' }}>{critCount}</b></div>
        </div>
        <div className="sg-full">
          {suhu.map((s, i) => {
            const c = sColor(s.t);
            const p = Math.min(100, (s.t / 50) * 100);
            return (
              <div key={i} className="sf-card" style={{ borderColor: s.t >= 35 ? 'rgba(239,68,68,.3)' : s.t >= 30 ? 'rgba(245,158,11,.25)' : 'var(--bord)' }}>
                <div className="sf-room">{s.r}</div>
                <div className="sf-val" style={{ color: c }}>{s.t.toFixed(1)}°C</div>
                <div className="sf-hum">💧 Kelembapan {s.h}%</div>
                <span className={`badge ${sBadge(s.t)}`} style={{ marginTop: '6px', display: 'inline-block' }}>{sLabel(s.t)}</span>
                <div className="sf-th">
                  <div className="sf-thf" style={{ width: `${p}%`, background: c }}></div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="trend-wrap">
          <div className="trend-card">
            <div className="trend-title">Tren Suhu 24 Jam Terakhir — Ruang Server</div>
            <svg className="trend-svg" viewBox="0 0 800 90" preserveAspectRatio="none">
              <polyline points={`0,${H} ${pts} ${W},${H}`} fill="rgba(34,211,238,.08)" stroke="none" />
              <polyline points={pts} fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suhu;
