import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Gamepad2, Mic, Activity } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleStart = () => {
    navigate(isAuthenticated ? '/dashboard' : '/login');
  };

  const handleSecondary = () => {
    navigate('/parents-teachers');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-24 pb-32 px-4 relative overflow-hidden">
          <div className="container mx-auto text-center max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-text">
                Smart Education,<br/>
                <span className="text-primary">Personalized for You</span>
              </h1>
              <p className="text-xl text-textMuted mb-10 max-w-2xl mx-auto">
                An AI-powered learning platform that adapts to your child's pace, 
                making education engaging, fun, and highly effective.
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={handleStart} size="lg" className="rounded-full">
                  Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button onClick={handleSecondary} size="lg" variant="outline" className="rounded-full">
                  For Parents & Teachers
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 opacity-30">
            <div className="w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
          </div>
          <div className="absolute top-1/3 right-0 -translate-y-1/2 -z-10 opacity-30">
            <div className="w-80 h-80 bg-secondary/30 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-surface">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Everything you need to succeed</h2>
              <p className="text-textMuted">Built around the 4 pillars of modern smart education.</p>
            </div>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                {
                  icon: <Brain className="h-8 w-8 text-primary" />,
                  title: "Personalized Learning",
                  desc: "Lessons and quizzes adapt to each child's level and performance in real-time."
                },
                {
                  icon: <Gamepad2 className="h-8 w-8 text-accent" />,
                  title: "Gamified Education",
                  desc: "Points, badges, levels, stories, streaks, and challenges to keep learners engaged."
                },
                {
                  icon: <Mic className="h-8 w-8 text-secondary" />,
                  title: "Multilingual Voice",
                  desc: "Regional-language UI plus audio/voice explanations for better understanding."
                },
                {
                  icon: <Activity className="h-8 w-8 text-muted-foreground" />,
                  title: "Progress Tracking",
                  desc: "Detailed dashboards for students, parents, and teachers to monitor growth."
                }
              ].map((feat, i) => (
                <motion.div 
                  key={i} 
                  variants={item}
                  className="p-6 rounded-2xl bg-background border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="mb-4 bg-surface w-14 h-14 rounded-xl flex items-center justify-center shadow-sm">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
                  <p className="text-textMuted">{feat.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
