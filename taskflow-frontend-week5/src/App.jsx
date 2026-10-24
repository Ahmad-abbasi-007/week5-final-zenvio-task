import { useApp } from './context/AppContext';
import Dashboard from './components/Dashboard';

export default function App() {
  const { user, theme, toggleTheme } = useApp(); // GLOBAL STATE USE - No Prop Drilling

  return (
    <div style={{ background: theme === 'dark' ? '#000' : '#fff', color: theme === 'dark' ? '#fff' : '#000', minHeight: '100vh', padding: '20px' }}>
      <header style={{display:'flex', justifyContent:'space-between'}}>
        <h1>Week 5 - {user.name} (Global State)</h1>
        <button onClick={toggleTheme}>Toggle Theme ({theme})</button>
      </header>
      <p>Task 1: Context API used for User + Theme + Tasks. 2 features refactored from props to global state.</p>
      
      <Dashboard />
    </div>
  );
}