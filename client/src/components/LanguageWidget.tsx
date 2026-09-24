import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, X } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export function LanguageWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();



  const changeLanguage = (langCode: string) => {
    sessionStorage.setItem('language_selected', 'true');
    // Find the hidden google translate select element
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 p-4 rounded-full bg-primary/40 border border-primary/50 backdrop-blur-xl shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.8)] transition-all ${isOpen ? 'hidden' : 'block'}`}
      >
        <Languages className="w-8 h-8 text-white drop-shadow-md" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom left' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 left-6 z-50 w-[250px] p-4 flex flex-col bg-surface/90 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-white tracking-wide">Language</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-2 notranslate">
              <button onClick={() => changeLanguage('en')} className="p-3 rounded-xl bg-white/5 hover:bg-primary/40 border border-white/10 text-white text-left transition-all font-medium">English</button>
              <button onClick={() => changeLanguage('hi')} className="p-3 rounded-xl bg-white/5 hover:bg-primary/40 border border-white/10 text-white text-left transition-all font-medium">Hindi (हिंदी)</button>
              <button onClick={() => changeLanguage('te')} className="p-3 rounded-xl bg-white/5 hover:bg-primary/40 border border-white/10 text-white text-left transition-all font-medium">Telugu (తెలుగు)</button>
              <button onClick={() => changeLanguage('ta')} className="p-3 rounded-xl bg-white/5 hover:bg-primary/40 border border-white/10 text-white text-left transition-all font-medium">Tamil (தமிழ்)</button>
              <button onClick={() => changeLanguage('kn')} className="p-3 rounded-xl bg-white/5 hover:bg-primary/40 border border-white/10 text-white text-left transition-all font-medium">Kannada (ಕನ್ನಡ)</button>
              <button onClick={() => changeLanguage('mr')} className="p-3 rounded-xl bg-white/5 hover:bg-primary/40 border border-white/10 text-white text-left transition-all font-medium">Marathi (मराठी)</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}