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
    {/* FOOTER */}
      <footer className="bg-base-200 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm opacity-80">
          <div className="font-semibold">
            © {new Date().getFullYear()} Cartify
          </div>
          <div className="mt-1">
            Built & maintained by <strong>Pranav Trivedi</strong>. All rights reserved.
          </div>
          <div className="mt-1 text-xs opacity-60">
            Unauthorized copying or redistribution is prohibited.
          </div>
        </div>
      </footer>
    </div>
  );
}