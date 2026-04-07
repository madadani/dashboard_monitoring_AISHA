import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import { tColor, tBadge, tLabel } from '../data';

const Tandon = () => {
  const { tanks, togglePump } = useContext(DashboardContext);

  const normTanks = tanks.filter(t => t.pct >= 60).length;
  const warnTanks = tanks.filter(t => t.pct >= 30 && t.pct < 60).length;
  const critTanks = tanks.filter(t => t.pct < 30).length;
  const pumpon = tanks.filter(t => t.pump).length;

  return (
    <div className="page active">
      <div className="pg-inner">
        <div className="stat-bar">
          <div className="sbi">Total: <b>8</b></div>
          <div className="sbi">Normal: <b style={{ color: 'var(--green)' }}>{normTanks}</b></div>
          <div className="sbi">Warning: <b style={{ color: 'var(--amber)' }}>{warnTanks}</b></div>
          <div className="sbi">Kritis: <b style={{ color: 'var(--red)' }}>{critTanks}</b></div>
          <div className="sbi">Pompa ON: <b style={{ color: 'var(--green)' }}>{pumpon}</b></div>
        </div>
        <div className="tg-full">
          {tanks.map((t) => {
            const c = tColor(t.pct);
            const vol = Math.round(t.pct * 20);
            const temp = (26 + (t.id * 0.5)).toFixed(1); // deterministic dummy temp based on ID
            
            return (
              <div key={t.id} className={`tc ${t.pct < 30 ? 'crit' : t.pct < 60 ? 'warn' : ''} ${t.pump ? 'pump-on' : ''}`}>
                <div className="tc-hdr">
                  <span className="tc-name">Tandon #{t.id}</span>
                  <span className={`badge ${tBadge(t.pct)}`}>{tLabel(t.pct)}</span>
                </div>
                <div className="tank-vis">
                  <div className="tank-water" style={{ height: `${t.pct}%`, background: `${c}44` }}>
                    <span className="tank-pct">{t.pct}%</span>
                  </div>
                </div>
                <div className="tc-stats">
                  <div className="tc-stat"><div className="tc-sl">Volume</div><div className="tc-sv">{vol} L</div></div>
                  <div className="tc-stat"><div className="tc-sl">Suhu Air</div><div className="tc-sv">{temp}°C</div></div>
                  <div className="tc-stat"><div className="tc-sl">Level</div><div className="tc-sv">{t.pct}%</div></div>
                  <div className="tc-stat"><div className="tc-sl">Status</div><div className="tc-sv" style={{ color: t.pump ? 'var(--green)' : 'var(--muted)' }}>{t.pump ? 'AKTIF' : 'STANDBY'}</div></div>
                </div>
                <button className={`pump-btn ${t.pump ? 'on' : 'off'}`} onClick={() => togglePump(t.id)}>
                  {t.pump ? '● POMPA ON' : '○ POMPA OFF'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tandon;
