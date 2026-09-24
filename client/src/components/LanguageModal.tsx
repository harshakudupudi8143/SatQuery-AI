import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Globe } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export function LanguageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && !localStorage.getItem('language_selected_permanently')) {
      // Small delay to let page load
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const selectLanguage = (langCode: string) => {
    localStorage.setItem('language_selected_permanently', 'true');
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-md p-8 flex flex-col items-center bg-surface/90 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-[0_0_50px_rgba(124,58,237,0.3)] overflow-hidden text-center"
          >
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 shadow-inner border border-primary/30">
              <Globe className="w-8 h-8 text-primary drop-shadow-md" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to SatQuery AI</h2>
            <p className="text-white/70 mb-8">Please select your preferred language to continue.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full notranslate">
              <button onClick={() => selectLanguage('en')} className="p-4 rounded-xl bg-white/5 hover:bg-primary/40 border border-white/10 text-white transition-all font-medium flex items-center justify-center gap-2">
                English
              </button>
              <button onClick={() => selectLanguage('hi')} className="p-4 rounded-xl bg-white/5 hover:bg-primary/40 border border-white/10 text-white transition-all font-medium flex items-center justify-center gap-2">
                Hindi (हिंदी)
              </button>
              <button onClick={() => selectLanguage('te')} className="p-4 rounded-xl bg-white/5 hover:bg-primary/40 border border-white/10 text-white transition-all font-medium flex items-center justify-center gap-2">
                Telugu (తెలుగు)
              </button>
              <button onClick={() => selectLanguage('ta')} className="p-4 rounded-xl bg-white/5 hover:bg-primary/40 border border-white/10 text-white transition-all font-medium flex items-center justify-center gap-2">
                Tamil (தமிழ்)
              </button>
              <button onClick={() => selectLanguage('kn')} className="p-4 rounded-xl bg-white/5 hover:bg-primary/40 border border-white/10 text-white transition-all font-medium flex items-center justify-center gap-2">
                Kannada (ಕನ್ನಡ)
              </button>
              <button onClick={() => selectLanguage('mr')} className="p-4 rounded-xl bg-white/5 hover:bg-primary/40 border border-white/10 text-white transition-all font-medium flex items-center justify-center gap-2">
                Marathi (मराठी)
              </button>
            </div>
            
            <button onClick={() => setIsOpen(false)} className="mt-6 text-sm text-white/50 hover:text-white transition-colors">
              I'll choose later
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}