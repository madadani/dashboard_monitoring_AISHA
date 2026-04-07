import React, { createContext, useState, useEffect } from 'react';
import { initialTanks, initialIoT, initialSuhu, pasienWk, depts } from '../data';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [tanks, setTanks] = useState(initialTanks);
  const [iot, setIot] = useState(initialIoT);
  const [suhu, setSuhu] = useState(initialSuhu);
  const [waktuTunggu, setWaktuTunggu] = useState({ inap: 22, jalan: 28 });
  const [waitHistory, setWaitHistory] = useState([20, 24, 22, 28, 25, 27, 23]);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTanks(prev => prev.map(t => ({
        ...t,
        pct: Math.max(5, Math.min(100, Math.round(t.pct + (Math.random() * 4 - 2))))
      })));
      setSuhu(prev => prev.map(s => ({
        ...s,
        t: +(s.t + (Math.random() * 0.4 - 0.2)).toFixed(1)
      })));
      setWaktuTunggu(prev => ({
        inap: Math.max(10, Math.min(45, prev.inap + Math.floor(Math.random() * 3) - 1)),
        jalan: Math.max(15, Math.min(50, prev.jalan + Math.floor(Math.random() * 3) - 1))
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const togglePump = (id) => {
    setTanks(prev => prev.map(t => t.id === id ? { ...t, pump: !t.pump } : t));
  };

  const toggleIoT = (index) => {
    setIot(prev => prev.map((item, i) => i === index ? { ...item, on: !item.on } : item));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <DashboardContext.Provider value={{ tanks, iot, suhu, pasienWk, depts, waktuTunggu, waitHistory, theme, togglePump, toggleIoT, toggleTheme }}>
      {children}
    </DashboardContext.Provider>
  );
};
