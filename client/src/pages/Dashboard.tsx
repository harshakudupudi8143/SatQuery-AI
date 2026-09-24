import { useAuthStore } from '@/store/useAuthStore';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Star, Trophy, Play, BookOpen, Target, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Quick fallback if it's a parent/teacher for now
  if (user.role !== 'student') {
    return <Navigate to="/parents-teachers" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome & Stats Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-text font-heading drop-shadow-md">
              Ready to explore, <span className="text-primary glow-text">{user.name}?</span>
            </h1>
            <p className="text-textMuted mt-1">Level {user.level} Scholar</p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-surface backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/20 shadow-lg">
              <Flame className="text-accent h-5 w-5" />
              <span className="font-bold">{user.streak} Day Streak</span>
            </div>
            <div className="bg-surface backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/20 shadow-lg">
              <Star className="text-primary h-5 w-5" />
              <span className="font-bold">{user.xp} XP</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 w-full overflow-hidden">
          {/* Main Content Area */}
          <div className="lg:w-2/3 w-full space-y-8 min-w-0 flex-1">
            
            {/* Continue Learning Hero Card */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 drop-shadow-sm">
                <Play className="h-5 w-5 text-primary" /> Up Next
              </h2>
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-primary/20 backdrop-blur-xl border border-white/30 rounded-[2rem] p-8 relative overflow-hidden shadow-[0_8px_32px_rgba(124,58,237,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <div className="relative z-10 w-2/3">
                  <span className="text-sm font-bold text-white tracking-wider uppercase mb-2 block opacity-80">Mathematics</span>
                  <h3 className="text-3xl font-bold font-heading mb-4 text-white drop-shadow-md">Fractions & Decimals</h3>
                  <p className="text-white/80 mb-6">Master the basics of dividing the whole into parts. Adaptive quiz included!</p>
                  <Link to="/lesson/fractions">
                    <Button size="lg" className="rounded-2xl">Start Lesson</Button>
                  </Link>
                </div>
                <BookOpen className="absolute -right-10 -bottom-10 h-64 w-64 text-white/20 rotate-12 blur-[2px]" />
              </motion.div>
            </section>

            {/* Game Worlds */}
            <section>
              <h2 className="text-xl font-bold mb-4 drop-shadow-sm">Learning Worlds</h2>
              <div className="flex flex-col gap-6">
                {[
                  { id: 'fractions', title: "Mathematics", icon: "➗", levels: ["Fractions", "Algebra Basics", "Geometry"] },
                  { id: 'science', title: "Science", icon: "🧬", levels: ["Solar System", "Cell Biology", "Physics"] },
                  { id: 'geography', title: "Geography", icon: "🌍", levels: ["Continents", "Capitals", "Oceans"] },
                  { id: 'coding', title: "Coding", icon: "💻", levels: ["HTML Basics", "JS Loops", "React"] },
                ].map((subject, i) => (
                  <div key={i} className="p-6 rounded-[2rem] border border-white/10 bg-surface backdrop-blur-lg shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-4xl">{subject.icon}</div>
                      <h3 className="text-2xl font-bold text-white drop-shadow-md">{subject.title}</h3>
                    </div>
                    <div className="flex items-center justify-between relative px-2 sm:px-8">
                      {/* Connection Line */}
                      <div className="absolute top-7 left-8 right-8 h-2 bg-white/10 -translate-y-1/2 z-0 rounded-full" />
                      
                      {subject.levels.map((lvl, lvlIdx) => (
                        <div key={lvlIdx} className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer w-[30%]">
                          <Link to={lvlIdx === 0 ? `/lesson/${subject.id}` : '#'} className="relative">
                            <motion.div 
                              whileHover={{ scale: lvlIdx === 0 ? 1.1 : 1 }}
                              className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl border-4 transition-transform ${lvlIdx === 0 ? 'bg-primary border-primary text-white shadow-[0_0_20px_rgba(124,58,237,0.6)]' : 'bg-surface border-white/20 text-white/40'}`}
                            >
                              {lvlIdx === 0 ? '★' : '🔒'}
                            </motion.div>
                          </Link>
                          <span className={`text-xs font-bold ${lvlIdx === 0 ? 'text-white' : 'text-white/40'}`}>Level {lvlIdx + 1}</span>
                          <span className={`text-[10px] text-center w-full leading-tight ${lvlIdx === 0 ? 'text-white/70' : 'text-white/30'}`}>{lvl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>\n          </div>\n\n          {/* Sidebar Area */}
          <div className="space-y-8">
            
            {/* Daily Quests */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 drop-shadow-sm">
                <Target className="h-5 w-5 text-secondary" /> Daily Quests
              </h2>
              <div className="bg-surface backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg space-y-4">
                {[
                  { text: "Complete 2 Science Modules", progress: "1/2", done: false },
                  { text: "Achieve a perfect score in Geography", progress: "0/1", done: false },
                  { text: "Earn 50 XP today", progress: "50/50", done: true },
                ].map((quest, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    {quest.done ? (
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="h-6 w-6 text-white/30 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${quest.done ? 'text-white/60 line-through' : 'text-white'}`}>
                        {quest.text}
                      </p>
                      <p className="text-xs text-white/50 font-bold mt-1 tracking-widest">{quest.progress}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Badges Shelf */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 drop-shadow-sm">
                <Trophy className="h-5 w-5 text-accent" /> Recent Badges
              </h2>
              <div className="bg-surface backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg grid grid-cols-3 gap-4 text-center">
                {[
                  { name: "First Quiz", icon: "🎯" },
                  { name: "3-Day Streak", icon: "🔥" },
                  { name: "Math Whiz", icon: "➗" },
                  { name: "Fast Learner", icon: "⚡" },
                  { name: "Locked", icon: "🔒", locked: true },
                  { name: "Locked", icon: "🔒", locked: true },
                ].map((badge, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-2 
                      ${badge.locked ? 'bg-white/5 opacity-50' : 'bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/30'}`}
                    >
                      {badge.icon}
                    </div>
                    <span className={`text-xs font-medium tracking-wide ${badge.locked ? 'text-white/40' : 'text-white/90'}`}>
                      {badge.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
