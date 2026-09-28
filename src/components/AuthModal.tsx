import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#131722] text-[#131722] dark:text-[#d1d4dc] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-blue-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-[#131722] dark:text-white">
            {mode === 'signup' ? 'Join 50 Million+ Traders' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-[#787B86] dark:text-[#848e9c] mt-1">
            Access real-time global markets, customizable Supercharts, and paper trading.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center text-emerald-600 dark:text-emerald-400 space-y-2 animate-in zoom-in-95">
            <CheckCircle className="w-12 h-12 mx-auto" />
            <h4 className="font-bold text-base">You are signed in!</h4>
            <p className="text-xs text-[#787B86]">Welcome to your TradingView workspace.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#787B86] dark:text-[#848e9c] mb-1">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-gray-200 dark:border-gray-700 bg-[#F8F9FD] dark:bg-[#1e222d] text-[#131722] dark:text-white outline-none focus:border-blue-600 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              {mode === 'signup' ? 'Create Free Account' : 'Sign In'}
            </button>

            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-[#787B86] dark:text-[#848e9c]">
                {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
              </span>
              <button
                type="button"
                onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
                className="font-bold text-blue-600 hover:underline cursor-pointer"
              >
                {mode === 'signup' ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
