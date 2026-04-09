export const initialTanks = Array.from({length:8},(_,i)=>({id:i+1,pct:Math.floor(Math.random()*70)+20,pump:i<5}));

export const initialIoT = [
  {i:'💡',n:'Lampu Koridor',l:'Lantai 1',on:true},
  {i:'🔧',n:'Pompa Utama',l:'Basement',on:true},
  {i:'❄️',n:'AC Ruangan',l:'ICU',on:true},
  {i:'⚡',n:'Genset',l:'Gudang',on:false},
  {i:'🌀',n:'Exhaust Fan',l:'Dapur',on:true},
  {i:'🔔',n:'Alarm',l:'Lobby',on:false},
  {i:'💡',n:'Lampu Darurat',l:'Tangga',on:true},
  {i:'🔌',n:'UPS Server',l:'Ruang IT',on:true},
  {i:'🌡️',n:'HVAC',l:'Lantai 2',on:false},
  {i:'📡',n:'WiFi AP',l:'Gedung',on:true},
  {i:'🔒',n:'Pintu Otomatis',l:'Pintu Utama',on:true},
  {i:'💧',n:'Sprinkler',l:'Atap',on:false},
];

export const initialSuhu = [
  {r:'Ruang Server',t:38,h:55},{r:'ICU',t:22,h:60},{r:'Gudang',t:31,h:70},{r:'Lobby',t:26,h:65},
  {r:'Apotek',t:24,h:58},{r:'Lab',t:20,h:50},{r:'Dapur',t:33,h:75},{r:'Radiologi',t:21,h:52},
];

export const pasienWk = [112,128,135,119,145,138,142];
export const depts = [{n:'Penyakit Dalam',v:38},{n:'Bedah',v:22},{n:'Anak',v:18},{n:'Kandungan',v:15},{n:'Jantung',v:28},{n:'Saraf',v:12}];

export const initialCctv = [
  { id: 1, n: 'IGD Utama', v: '/igd_utama.mp4' },
  { id: 2, n: 'Parkir Belakang', v: '/parkir_belakang.mp4' },
  { id: 3, n: 'Ruang Tunggu Poli Lt 2', v: '/ruang_tunggu_Poli_lt2 (1).mp4' }, 
  { id: 4, n: 'Apotek Rawat Jalan', v: '/apotek.mp4' }, 
  { id: 5, n: 'Bangsal Cempaka', v: '/bangsal_cempaka.mp4' },
  { id: 6, n: 'Unit Dialisis', v: '/unit_dialisis.mp4' },
  { id: 7, n: 'Pintu Masuk Utama', v: '/igd_utama.mp4' }, 
  { id: 8, n: 'Lobby', v: '/ruang_tunggu_Poli_lt2 (1).mp4' }, 
];

export const tColor=p=>p<30?'#f87171':p<60?'#fbbf24':'#22d3ee';
export const tBadge=p=>p<30?'b-red':p<60?'b-amber':'b-green';
export const tLabel=p=>p<30?'KRITIS':p<60?'WARNING':'NORMAL';
export const sColor=t=>t>=35?'#f87171':t>=30?'#fbbf24':'#4ade80';
export const sLabel=t=>t>=35?'KRITIS':t>=30?'PANAS':'NORMAL';
export const sBadge=t=>t>=35?'b-red':t>=30?'b-amber':'b-green';
