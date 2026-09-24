import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { GoogleIcon } from './icons/GoogleIcon';

interface Account {
  name: string;
  email: string;
  avatar: string;
}

interface GoogleAccountChooserProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (account: Account) => void;
}

const mockAccounts: Account[] = [
  { name: 'Alex Johnson', email: 'alex.j@gmail.com', avatar: 'A' },
  { name: 'Sarah Connor', email: 'sarah.c@gmail.com', avatar: 'S' },
];

export function GoogleAccountChooser({ isOpen, onClose, onSelect }: GoogleAccountChooserProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          
          <div className="p-8 text-center border-b border-gray-100">
            <GoogleIcon className="h-8 w-8 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-gray-900 mb-1">Sign in</h2>
            <p className="text-gray-600">Choose an account</p>
            <p className="text-sm text-gray-500 mt-1">to continue to SatQuery AI</p>
          </div>
          
          <div className="p-2">
            {mockAccounts.map((acc, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onSelect(acc)}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors text-left"
              >
                <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {acc.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{acc.name}</p>
                  <p className="text-sm text-gray-500">{acc.email}</p>
                </div>
              </button>
            ))}
            
            <button
              type="button"
              onClick={() => onSelect({ name: 'Guest User', email: 'guest@gmail.com', avatar: 'G' })}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors text-left border-t border-gray-50 mt-2"
            >
              <div className="h-10 w-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-lg shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Use another account</p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
