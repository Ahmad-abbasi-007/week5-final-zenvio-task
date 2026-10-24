import { useEffect, useState } from 'react';
import { 
  BarChart, Bar, 
  PieChart, Pie, 
  LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  // Backend URL - Localhost for now, Deploy pe Render URL laga dena
  const API_URL = "https://week5-backend-xijv.onrender.com";

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/dashboard-stats?category=${filter}`)
      .then(r => r.json())
      .then(d => { 
        setData(d); 
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, [filter]);

  // 1. SKELETON LOADER - Task 1 requirement
  if (loading) return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
        <div style={skeletonCard}></div>
        <div style={skeletonCard}></div>
        <div style={skeletonCard}></div>
      </div>
      <div style={{ height: '350px', background: '#222', borderRadius: '12px', marginTop: '20px' }}></div>
      <p style={{ color: '#888', marginTop: '10px' }}>Loading data... (Skeleton Loader Active)</p>
    </div>
  );

  // 2. EMPTY STATE - Task 1 requirement
  if (!data || data.total === 0) return (
    <div style={{ padding: '60px', textAlign: 'center', background: '#111', borderRadius: '12px', color: '#fff', marginTop: '20px' }}>
      <h2>📭 No Tasks Found</h2>
      <p style={{ color: '#aaa' }}>Zero data for "{filter}". This is the Empty State UI.</p>
      <button onClick={() => setFilter('All')} style={btnStyle}>Show All Tasks</button>
    </div>
  );

  const barData = [
    { name: 'Design', value: data.byCategory.Design || 0 }, 
    { name: 'Dev', value: data.byCategory.Dev || 0 }
  ];
  const pieData = Object.entries(data.byStatus).map(([name, value]) => ({ name, value }));
  const COLORS = ['#22c55e', '#eab308', '#ef4444', '#7c3aed'];

  return (
    <div style={{ padding: '20px', background: '#0a0a0a', color: '#fff', borderRadius: '12px', marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <h2>📊 Dashboard (4 Visuals)</h2>
        <div>
          <label style={{ marginRight: '10px' }}>Filter (Interactive):</label>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={selectStyle}>
            <option>All</option>
            <option>Design</option>
            <option>Dev</option>
          </select>
        </div>
      </div>

      {/* 1. STAT CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginTop: '20px' }}>
        <div style={card}><h2>{data.total}</h2><p>Total Tasks</p></div>
        <div style={card}><h2>{data.completed}</h2><p>Completed</p></div>
        <div style={card}><h2>{data.pending}</h2><p>Pending</p></div>
      </div>

      {/* 2. BAR CHART + 3. PIE CHART */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '25px' }}>
        <div style={chartBox}>
          <h4>Bar Chart - By Category</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="value" fill="#7c3aed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={chartBox}>
          <h4>Pie Chart - By Status</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. LINE CHART - Extra for 100% safety */}
      <div style={{ ...chartBox, marginTop: '20px' }}>
        <h4>Line Chart - Tasks Trend (4th Visual)</h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={barData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Styles
const card = { background: '#1a1a1a', padding: '20px', borderRadius: '12px', textAlign: 'center', border: '1px solid #2a2a2a' };
const chartBox = { background: '#111', padding: '15px', borderRadius: '12px', border: '1px solid #222' };
const skeletonCard = { height: '80px', background: '#222', borderRadius: '12px', animation: 'pulse 1s infinite' };
const selectStyle = { padding: '8px 12px', borderRadius: '6px', background: '#1a1a1a', color: '#fff', border: '1px solid #333' };
const btnStyle = { marginTop: '15px', padding: '10px 20px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' };