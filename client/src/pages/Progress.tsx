import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { Navigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { Activity, Brain, Target, Trophy } from 'lucide-react';

const activityData = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 30 },
  { day: 'Wed', minutes: 60 },
  { day: 'Thu', minutes: 20 },
  { day: 'Fri', minutes: 40 },
  { day: 'Sat', minutes: 15 },
  { day: 'Sun', minutes: 0 },
];

const xpData = [
  { week: 'Week 1', xp: 200 },
  { week: 'Week 2', xp: 500 },
  { week: 'Week 3', xp: 850 },
  { week: 'Week 4', xp: 1250 },
];

const masteryData = [
  { subject: 'Fractions', score: 90, fullMark: 100 },
  { subject: 'Decimals', score: 75, fullMark: 100 },
  { subject: 'Geometry', score: 60, fullMark: 100 },
  { subject: 'Algebra', score: 85, fullMark: 100 },
  { subject: 'Logic', score: 95, fullMark: 100 },
];

export default function Progress() {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold font-heading text-text mb-2">
            {user.role === 'student' ? 'My Progress' : `${user.name}'s Dashboard`}
          </h1>
          <p className="text-textMuted">
            {user.role === 'student' 
              ? 'Track your learning journey and see how much you have grown!' 
              : 'Monitor the learning metrics, activity, and mastery levels.'}
          </p>
        </motion.div>

        {/* Top Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total XP', value: user.xp || '1,250', icon: <Trophy className="h-6 w-6 text-yellow-500" />, color: 'bg-yellow-50' },
            { title: 'Day Streak', value: user.streak || '7', icon: <Activity className="h-6 w-6 text-orange-500" />, color: 'bg-orange-50' },
            { title: 'Current Level', value: user.level || '5', icon: <Target className="h-6 w-6 text-primary" />, color: 'bg-primary/10' },
            { title: 'Topics Mastered', value: '12', icon: <Brain className="h-6 w-6 text-purple-500" />, color: 'bg-purple-50' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
            >
              <div className={`p-4 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-textMuted">{stat.title}</p>
                <h3 className="text-2xl font-bold text-text">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* XP Growth (Line Chart) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-surface p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2"
          >
            <h3 className="text-lg font-bold mb-6 text-text">XP Growth Over Time</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={xpData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#8b8b8b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#8b8b8b', fontSize: 12}} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="xp" 
                    stroke="#1E40AF" 
                    strokeWidth={4} 
                    dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Subject Mastery (Radar Chart) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-surface p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <h3 className="text-lg font-bold mb-2 text-text">Subject Mastery</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={masteryData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{fill: '#4b5563', fontSize: 11}} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Mastery" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                  <RechartsTooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Weekly Activity (Bar Chart) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-surface p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-3"
          >
            <h3 className="text-lg font-bold mb-6 text-text">Weekly Activity (Minutes)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#8b8b8b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#8b8b8b', fontSize: 12}} />
                  <RechartsTooltip 
                    cursor={{fill: '#f3f4f6'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="minutes" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
