import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { User, Calendar, BookOpen, Save } from 'lucide-react';

export default function Profile() {
  const { user, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    dob: user?.dob || '',
    standard: user?.standard || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12 flex justify-center items-start">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-surface/80 backdrop-blur-3xl rounded-[2rem] border border-white/20 shadow-[0_0_50px_rgba(124,58,237,0.1)] p-8 md:p-12"
        >
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
            <h1 className="text-3xl font-bold text-white font-heading">Student Profile</h1>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline" className="rounded-full">
                Edit Profile
              </Button>
            )}
          </div>

          <div className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-textMuted flex items-center gap-2">
                <User className="w-4 h-4" /> Full Name
              </label>
              {isEditing ? (
                <input 
                  type="text" 
                  name="name"
                  value={formData.name} 
                  onChange={handleChange}
                  className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Enter your name"
                />
              ) : (
                <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white">
                  {user.name}
                </div>
              )}
            </div>

            {/* Date of Birth Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-textMuted flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Date of Birth
              </label>
              {isEditing ? (
                <input 
                  type="date" 
                  name="dob"
                  value={formData.dob} 
                  onChange={handleChange}
                  className="w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all [color-scheme:dark]"
                />
              ) : (
                <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white">
                  {user.dob || <span className="text-white/40 italic">Not set</span>}
                </div>
              )}
            </div>

            {/* Standard Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-textMuted flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Standard / Grade
              </label>
              {isEditing ? (
                <select
                  name="standard"
                  value={formData.standard}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a2e] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all"
                >
                  <option value="">Select your standard...</option>
                  <option value="6th Grade">6th Grade</option>
                  <option value="7th Grade">7th Grade</option>
                  <option value="8th Grade">8th Grade</option>
                  <option value="9th Grade">9th Grade</option>
                  <option value="10th Grade">10th Grade</option>
                  <option value="11th Grade">11th Grade</option>
                  <option value="12th Grade">12th Grade</option>
                </select>
              ) : (
                <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white">
                  {user.standard || <span className="text-white/40 italic">Not set</span>}
                </div>
              )}
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="pt-6 flex justify-end gap-4">
                <Button onClick={() => setIsEditing(false)} variant="ghost">Cancel</Button>
                <Button onClick={handleSave} className="rounded-full flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Changes
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}