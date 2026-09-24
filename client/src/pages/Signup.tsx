import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuthStore, type Role } from '@/store/useAuthStore';
import { BookOpen } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function Signup() {
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('student');
  const [consent, setConsent] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'student' && !consent) return; // Basic validation
    const success = await login(name || 'New Learner', role);
    if (success) {
      navigate('/dashboard');
    } else {
      alert("Registration failed! The backend server could not be reached.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (role === 'student' && !consent) {
      alert("Please check the consent box before signing up with Google.");
      return;
    }
    
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      const success = await login(decoded.name || "Google Learner", role);
      if (success) {
        navigate('/dashboard');
      } else {
        alert("Google Registration failed! The backend server could not be reached.");
      }
    }
  };

  const handleGoogleError = () => {
    console.error('Google Registration Failed');
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
          <h1 className="text-3xl font-bold font-heading text-white drop-shadow-md">Create Account</h1>
          <p className="text-white/60 text-sm">Join the smartest learning platform</p>
        </div>

        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            shape="rectangular"
            theme="outline"
            text="signup_with"
          />
        </div>
        
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest">
            <span className="bg-transparent px-2 text-white/50 font-bold backdrop-blur-md rounded-full">Or sign up with email</span>
          </div>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-white/80 mb-2 tracking-wide">Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-sm transition-all"
              required
              placeholder="e.g. Alex"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white/80 mb-2 tracking-wide">I am registering as a...</label>
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

          {role === 'student' && (
            <div className="flex items-start gap-3 p-4 bg-secondary/10 rounded-2xl border border-secondary/20 backdrop-blur-sm">
              <input 
                type="checkbox" 
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1"
                required
              />
              <label htmlFor="consent" className="text-sm text-white/70">
                I have my parent or guardian's consent to use this platform, and I agree to the <Link to="#" className="text-secondary hover:text-white transition-colors hover:underline">Privacy Policy</Link>.
              </label>
            </div>
          )}

          <Button type="submit" size="lg" className="w-full rounded-xl">
            Create Account
          </Button>
          
          <p className="text-center text-sm text-white/60 mt-4">
            Already have an account? <Link to="/login" className="text-primary font-bold hover:text-white transition-colors">Log in</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
