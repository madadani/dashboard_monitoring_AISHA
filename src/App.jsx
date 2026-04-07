import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardProvider } from './context/DashboardContext';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Tandon from './pages/Tandon';
import CCTV from './pages/CCTV';
import Pasien from './pages/Pasien';
import IoT from './pages/IoT';
import Suhu from './pages/Suhu';
import WaktuTunggu from './pages/WaktuTunggu';
import './index.css';

function App() {
  return (
    <DashboardProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tandon" element={<Tandon />} />
          <Route path="/cctv" element={<CCTV />} />
          <Route path="/pasien" element={<Pasien />} />
          <Route path="/iot" element={<IoT />} />
          <Route path="/suhu" element={<Suhu />} />
          <Route path="/waktu-tunggu" element={<WaktuTunggu />} />
        </Routes>
      </Router>
    </DashboardProvider>
  );
}

export default App;
