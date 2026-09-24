import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { BookOpen, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';

export function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-heading font-extrabold text-2xl tracking-tighter text-primary">SatQuery AI</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link to="/#features" className="text-sm font-medium text-textMuted hover:text-primary transition-colors">Features</Link>
          <Link to="/#how-it-works" className="text-sm font-medium text-textMuted hover:text-primary transition-colors">How it works</Link>
        </nav>
        <div className="flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <Button onClick={() => navigate('/progress')} variant="ghost">Progress</Button>
              <Button onClick={() => navigate('/dashboard')} variant="ghost">Dashboard</Button>
              <Button onClick={() => navigate('/profile')} variant="ghost" size="icon" className="rounded-full bg-white/5 border border-white/10 hover:bg-white/10" title="Profile">
                <UserCircle className="h-5 w-5 text-white" />
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm">Logout</Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate('/login')} variant="ghost">Log in</Button>
              <Button onClick={() => navigate('/signup')}>Sign up</Button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
