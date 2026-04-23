import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="glass-nav px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
              B
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:block">
              Blog<span className="text-indigo-600">Pro</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link to="/" className={`hover:text-indigo-600 transition-colors ${location.pathname === '/' ? 'text-indigo-600' : ''}`}>
                Home
              </Link>
              <Link to="/dashboard" className={`hover:text-indigo-600 transition-colors ${location.pathname === '/dashboard' ? 'text-indigo-600' : ''}`}>
                Dashboard
              </Link>
            </div>

            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 hidden md:block" />

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:scale-110 active:scale-95 transition-all"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <Link to="/dashboard">
                <div className="w-10 h-10 rounded-full border-2 border-indigo-600 p-0.5 overflow-hidden active:scale-95 transition-all">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                    alt="User"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-slate-200 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            © 2024 BlogPro. Built with React & Framer Motion.
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">GitHub</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
