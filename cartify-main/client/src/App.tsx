import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { useEffect } from 'react';
import { useAuth } from './store/auth';

export default function App() {
  const { fetchMe, token } = useAuth();
  useEffect(() => { fetchMe(); }, [token]);
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}