import { motion } from 'framer-motion';
import { Settings, Hammer, HardHat, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';

export default function UnderConstruction() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-transparent overflow-hidden">
      <Navbar />
      
      <main className="flex-1 relative flex items-center justify-center p-4">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              rotate: -360,
              scale: [1, 1.5, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] bg-secondary/10 rounded-full blur-3xl"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative z-10 w-full max-w-2xl bg-surface/80 backdrop-blur-2xl p-12 rounded-[3rem] border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)] text-center"
        >
          {/* Animated Icons Container */}
          <div className="relative h-40 flex items-center justify-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute text-primary/30"
            >
              <Settings className="w-40 h-40" />
            </motion.div>
            
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute text-secondary/30 -translate-x-12 translate-y-8"
            >
              <Settings className="w-20 h-20" />
            </motion.div>

            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0],
                y: [0, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 bg-white/10 p-6 rounded-full border border-white/20 backdrop-blur-md shadow-xl"
            >
              <HardHat className="w-12 h-12 text-accent drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
            </motion.div>
          </div>

          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold font-heading text-white mb-6 drop-shadow-lg"
          >
            Parents & Teachers Hub
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="inline-block px-4 py-2 bg-accent/20 border border-accent/30 rounded-full text-accent font-bold tracking-widest uppercase text-sm mb-6 animate-pulse">
              Under Construction
            </div>
            
            <p className="text-white/70 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              We are working hard to build powerful analytics, progress tracking, and custom lesson plans for parents and teachers. Stay tuned for the ultimate educator dashboard!
            </p>

            <Button 
              size="lg" 
              onClick={() => navigate('/')}
              className="rounded-2xl px-8 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Return Home
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
