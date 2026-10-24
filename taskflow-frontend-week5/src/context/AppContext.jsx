import { createContext, useContext, useState } from 'react';
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user] = useState({ name: "Ahmad Abbasi" });
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  
  return (
    <AppContext.Provider value={{ user, tasks, setTasks, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};
export const useApp = () => useContext(AppContext);