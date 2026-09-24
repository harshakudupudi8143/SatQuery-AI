import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuthStore, type Role } from '@/store/useAuthStore';
import { BookOpen } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const [name, setName] = useState('Alex');
  const [role, setRole] = useState<Role>('student');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(name, role);
    if (success) {
      navigate('/dashboard');
    } else {
      alert("Login failed! The backend server could not be reached. Please check the terminal.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      const success = await login(decoded.name || "Google User", role);
      if (success) {
        navigate('/dashboard');
      } else {
        alert("Google Login failed! The backend server could not be reached.");
      }
    }
  };

  const handleGoogleError = () => {
    console.error('Google Login Failed');
    alert("Google authentication failed. Please check your connection or Client ID.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface/80 backdrop-blur-2xl p-8 rounded-[3rem] shadow-[0_0_50px_rgba(255,255,255,0.1)] border border-white/20"
      >
        <div className="flex flex-col items-center mb-8">
          <BookOpen className="h-10 w-10 text-primary mb-2 drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]" />
          <h1 className="text-3xl font-bold font-heading text-white drop-shadow-md">Welcome back</h1>
          <p className="text-white/60 text-sm">Sign in to continue your learning journey</p>
        </div>

        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            shape="rectangular"
            theme="outline"
            text="continue_with"
          />
        </div>
        
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest">
            <span className="bg-transparent px-2 text-white/50 font-bold backdrop-blur-md rounded-full">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-white/80 mb-2 tracking-wide">Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-sm transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white/80 mb-2 tracking-wide">I am a...</label>
            <div className="grid grid-cols-3 gap-2">
              {['student', 'parent', 'teacher'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r as Role)}
                  className={`p-2 rounded-xl text-sm capitalize font-bold transition-all border ${
                    role === r 
                      ? 'bg-primary/40 border-primary/50 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]' 
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full rounded-xl">
            Log In
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
