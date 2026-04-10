import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../context/DashboardContext';
import WaktuTungguCard from '../components/WaktuTunggu';
import { tColor, sColor, initialCctv } from '../data';

const Dashboard = () => {
  const { tanks, iot, suhu, pasienWk, toggleIoT } = useContext(DashboardContext);
  const cctvRef = useRef(null);
  const [cctvScroll, setCctvScroll] = useState(0);
  const iotRef = useRef(null);
  const [iotScroll, setIotScroll] = useState(0);
  const [offlineCams, setOfflineCams] = useState({});

  const warnTanks = tanks.filter(t => t.pct < 60).length;
  const normTanks = tanks.filter(t => t.pct >= 60).length;
  const activeIoT = iot.filter(i => i.on).length;
  const hotSuhu = suhu.filter(s => s.t >= 30).length;
  const maxPasien = Math.max(...pasienWk);

  const scrollContainer = (ref, dir) => {
    if (ref.current) {
      const scrollAmt = ref.current.clientWidth;
      ref.current.scrollBy({ left: dir * scrollAmt, behavior: 'smooth' });
    }
  };

  const jumpToScroll = (ref, e) => {
    if (ref.current) {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        const scrollPos = pct * (ref.current.scrollWidth - ref.current.clientWidth);
        ref.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }
  };

  const handleScroll = (ref, setScroll) => {
    const el = ref.current;
    if (el) {
      const pct = el.scrollLeft / (el.scrollWidth - el.clientWidth);
      setScroll(pct || 0);
    }
  };

  const handleCamError = (id) => {
    setOfflineCams(prev => ({ ...prev, [id]: true }));
  };

  const generateSparkline = (data, color, label) => {
    const min = Math.min(...data) * 0.8;
    const max = Math.max(...data) * 1.1;
    const w = 300; 
    const h = 40; 
    const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    const points = data.map((val, i) => `${(i / (data.length - 1)) * w},${h - ((val - min) / (max - min)) * h}`).join(' ');

    return (
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '12px', background: 'var(--surf2)', borderRadius: '10px', border: '1px solid var(--bord)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
          <div style={{ fontSize: '9px', color: 'var(--muted)', fontWeight: '800', textTransform: 'uppercase' }}>{label}</div>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: color, fontFamily: "'JetBrains Mono', monospace" }}>{data[data.length - 1]}</div>
        </div>
        <div style={{ height: '45px', width: '100%' }}>
          <svg viewBox={`-10 -12 ${w + 20} ${h + 16}`} preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline points={`0,${h} ${points} ${w},${h}`} fill={`url(#grad-${color.replace('#', '')})`} stroke="none" />
            <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
            {data.map((val, i) => {
              const cx = (i / (data.length - 1)) * w;
              const cy = h - ((val - min) / (max - min)) * h;
              return (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="2.5" fill="var(--bg)" stroke={color} strokeWidth="1.5" />
                  <text 
                    x={cx} 
                    y={cy - 8} 
                    fill="var(--text2)" 
                    fontSize="9" 
                    textAnchor={i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"} 
                    fontFamily="'JetBrains Mono', monospace" 
                    fontWeight="700"
                  >
                    {val}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          {days.map(d => <span key={d} style={{ fontSize: '8px', color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", fontWeight: '600' }}>{d}</span>)}
        </div>
      </div>
    );
  };

  return (
    <div className="page active">

      <div className="db-grid">
        {/* Tandon Air */}
        <div className="sec-card">
          <div className="ch">
            <div className="ct" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <div className="ci" style={{ background: 'rgba(34,211,238,.1)' }}>💧</div>
              Monitoring Tandon Air
            </div>
            <span className="badge b-cyan" style={{ textTransform: 'uppercase' }}>8 Aktif</span>
          </div>
          <div className="cb">
            {/* Visual 8 Tangki Mini */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '16px', marginTop: '4px' }}>
              {tanks.map(t => {
                const c = tColor(t.pct);
                return (
                  <div key={t.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ fontSize: '9px', color: 'var(--muted)', fontWeight: '600', fontFamily: "'JetBrains Mono', monospace" }}>T-0{t.id}</div>
                    <div title={`Kapasitas: ${t.pct}%`} style={{
                      width: '100%',
                      maxWidth: '32px',
                      height: '42px',
                      background: 'var(--surf2)',
                      borderRadius: '6px',
                      border: '1px solid var(--bord)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)',
                      cursor: 'pointer'
                    }}>
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: `${t.pct}%`,
                        background: `linear-gradient(to top, ${c}99, ${c}44)`,
                        borderTop: `1px solid ${c}`,
                        transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1), background 1s'
                      }}>
                        {/* Efek Garis Air */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.4)' }}></div>
                      </div>
                    </div>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: c, fontFamily: "'JetBrains Mono', monospace" }}>{t.pct}%</div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ flex: 1, textAlign: 'center', background: 'var(--surf2)', border: '1px solid var(--bord)', borderRadius: '5px', padding: '4px', fontSize: '10px', color: 'var(--text2)' }}>
                <b style={{ color: 'var(--green)' }}>{normTanks}</b> Normal
              </div>
              <div style={{ flex: 1, textAlign: 'center', background: 'var(--surf2)', border: '1px solid var(--bord)', borderRadius: '5px', padding: '4px', fontSize: '10px', color: 'var(--text2)' }}>
                <b style={{ color: 'var(--amber)' }}>{warnTanks}</b> Perhatian
              </div>
            </div>
          </div>
          <div className="cf">
            <span className="badge b-green">Online</span>
            <Link to="/tandon" className="see-all">Lihat Semua →</Link>
          </div>
        </div>

        {/* CCTV */}
        <div className="sec-card">
          <div className="ch">
            <div className="ct" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <div className="ci" style={{ background: 'rgba(239,68,68,.1)' }}>📹</div>
              Pemantau CCTV
            </div>
            <span className="badge b-live" style={{ textTransform: 'uppercase' }}><span className="ldot"></span>LIVE</span>
          </div>
          <div className="cb cb-scroll">
            <div className="ccg" ref={cctvRef} onScroll={() => handleScroll(cctvRef, setCctvScroll)}>
              {initialCctv.map((cam, i) => {
                return (
                  <div key={cam.id} className="ccc">
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                      <div className="rec-box" style={{ top: '6px', left: '6px', padding: '2px 5px', fontSize: '8px', gap: '4px' }}>
                        <div className="rec-dot" style={{ width: '4px', height: '4px' }}></div>
                        REC
                      </div>
                      <video 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      >
                        <source src={`${import.meta.env.BASE_URL}${cam.v}`} type="video/mp4" />
                      </video>
                    </div>
                    <span className="cam-lb">CAM {cam.id} — {cam.n}</span>
                    <span className="cam-lv"><span className="ldot" style={{ background: 'var(--green)' }}></span>LIVE</span>
                  </div>
                );
              })}
            </div>
            <div className="ccc-nav">
              <button className="nav-btn" onClick={() => scrollContainer(cctvRef, -1)}>&lt;</button>
              <div className="nav-bar-wrap" onClick={(e) => jumpToScroll(cctvRef, e)} style={{ cursor: 'pointer' }}>
                <div className="nav-bar-thumb" style={{ transform: `translateX(${cctvScroll * 100}%)` }}></div>
              </div>
              <button className="nav-btn" onClick={() => scrollContainer(cctvRef, 1)}>&gt;</button>
            </div>
          </div>
          <div className="cf">
            <span style={{ fontSize: '10px', color: 'var(--muted)' }}>{initialCctv.length} Kamera Total</span>
            <Link to="/cctv" className="see-all">Lihat Semua →</Link>
          </div>
        </div>

        {/* Pasien */}
        <div className="sec-card">
          <div className="ch">
            <div className="ct" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <div className="ci" style={{ background: 'rgba(168,85,247,.1)' }}>🏥</div>
              Grafik Pasien
            </div>
            <span className="badge" style={{ background: 'rgba(168,85,247,.12)', color: '#c084fc', border: '1px solid rgba(168,85,247,.2)', textTransform: 'uppercase' }}>Hari ini</span>
          </div>
          <div className="cb" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {generateSparkline(pasienWk.map(v => Math.floor(v * 0.73)), '#34d399', 'Rawat Jalan')}
            {generateSparkline(pasienWk.map(v => Math.floor(v * 0.27)), '#a78bfa', 'Rawat Inap')}
          </div>
          <div className="cf">
            <span style={{ fontSize: '10px', color: 'var(--muted)' }}>7 hari terakhir</span>
            <Link to="/pasien" className="see-all">Lihat Semua →</Link>
          </div>
        </div>

        {/* Waktu Tunggu Pasien (Bagian ke-4 baru) */}
        <WaktuTungguCard />

        {/* IoT */}
        <div className="sec-card">
          <div className="ch">
            <div className="ct" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <div className="ci" style={{ background: 'rgba(251,191,36,.1)' }}>⚡</div>
              Kontrol IoT
            </div>
            <span className="badge b-amber" style={{ textTransform: 'uppercase' }}>{activeIoT} Aktif</span>
          </div>
          <div className="cb cb-scroll">
            <div className="iotg" ref={iotRef} onScroll={() => handleScroll(iotRef, setIotScroll)}>
              {iot.slice(0, 12).map((d, i) => (
                <div key={i} className={`iotm ${d.on ? 'on' : ''}`} onClick={() => toggleIoT(i)}>
                  <div className="iot-ico">{d.i}</div>
                  <div className="iot-nm">{d.n}</div>
                  <div className={`iot-st ${d.on ? 'on' : 'off'}`}>{d.on ? 'ON' : 'OFF'}</div>
                </div>
              ))}
            </div>
            <div className="ccc-nav">
              <button className="nav-btn" onClick={() => scrollContainer(iotRef, -1)}>&lt;</button>
              <div className="nav-bar-wrap" onClick={(e) => jumpToScroll(iotRef, e)} style={{ cursor: 'pointer' }}>
                <div className="nav-bar-thumb" style={{ transform: `translateX(${iotScroll * 100}%)` }}></div>
              </div>
              <button className="nav-btn" onClick={() => scrollContainer(iotRef, 1)}>&gt;</button>
            </div>
          </div>
          <div className="cf">
            <span style={{ fontSize: '10px', color: 'var(--muted)' }}>12 Perangkat</span>
            <Link to="/iot" className="see-all">Lihat Semua →</Link>
          </div>
        </div>

        {/* Suhu */}
        <div className="sec-card">
          <div className="ch">
            <div className="ct" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <div className="ci" style={{ background: 'rgba(239,68,68,.1)' }}>🌡️</div>
              Monitor Suhu
            </div>
            <span className="badge b-amber" style={{ textTransform: 'uppercase' }}>{hotSuhu} Hangat+</span>
          </div>
          <div className="cb">
            <div className="sug">
              {suhu.slice(0, 4).map((s, i) => {
                const c = sColor(s.t);
                const p = Math.min(100, (s.t / 50) * 100);
                return (
                  <div key={i} className="sum">
                    <div className="sum-r">{s.r}</div>
                    <div className="sum-v" style={{ color: c }}>{s.t}°C</div>
                    <div className="sum-b">
                      <div className="sum-bf" style={{ width: `${p}%`, background: c }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="cf">
            <span style={{ fontSize: '10px', color: 'var(--muted)' }}>8 Ruangan</span>
            <Link to="/suhu" className="see-all">Lihat Semua →</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
