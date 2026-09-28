import React, { useState } from 'react';
import { Search, Globe, User, Moon, Sun, Star, Activity, ChevronDown, Check } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
  isLive: boolean;
  onToggleLive: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenWatchlist,
  watchlistCount,
  isLive,
  onToggleLive,
  isDark,
  onToggleDark,
  onOpenAuth,
}) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = ['EN', 'ES', 'DE', 'FR', 'JA', 'ZH'];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#131722]/95 backdrop-blur-md border-b border-tv-border dark:border-[#2a2e39] transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left side: TV Logo & Primary Navigation */}
        <div className="flex items-center gap-6 lg:gap-8">
          {/* TradingView Brand Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="TradingView Home"
            className="flex items-center gap-1.5 focus:outline-none group text-left cursor-pointer"
          >
            <svg
              className="w-9 h-7 text-[#131722] dark:text-white group-hover:text-blue-600 transition-colors"
              fill="currentColor"
              viewBox="0 0 36 28"
            >
              <path d="M0 5.6C0 2.507 2.507 0 5.6 0H14v6H5.6a.6.6 0 00-.6.6V28H0V5.6z" />
              <path d="M14 11.2C14 8.107 16.507 5.6 19.6 5.6H28v6h-8.4a.6.6 0 00-.6.6V28h-5V11.2z" />
              <path d="M28 16.8c0-3.093 2.507-5.6 5.6-5.6H36v6h-2.4a.6.6 0 00-.6.6V28h-5V16.8z" />
            </svg>
          </button>

          {/* Search Bar with Shortcut Badge */}
          <button
            onClick={onOpenSearch}
            type="button"
            className="hidden md:flex items-center relative w-64 lg:w-80 text-left group"
          >
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#787B86] dark:text-[#848e9c]">
              <Search className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="w-full bg-[#F0F3FA] dark:bg-[#1e222d] text-sm text-[#131722] dark:text-[#d1d4dc] pl-10 pr-4 py-2 rounded-full border border-transparent group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-all flex items-center justify-between">
              <span className="text-[#787B86] dark:text-[#848e9c]">Search (Ctrl+K)</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-white dark:bg-[#2a2e39] text-[#787B86] dark:text-[#848e9c] rounded border border-gray-200 dark:border-gray-700">
                ⌘K
              </kbd>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-[#131722] dark:text-[#d1d4dc]">
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                onOpenSearch();
              }}
              className="hover:text-blue-600 transition-colors"
            >
              Products
            </a>
            <a
              href="#community"
              onClick={(e) => {
                e.preventDefault();
                alert('Welcome to TradingView Community: 50M+ traders and investors sharing real-time insights.');
              }}
              className="hover:text-blue-600 transition-colors"
            >
              Community
            </a>
            <a
              href="#markets"
              className="text-blue-600 relative py-5 border-b-2 border-blue-600 font-bold"
            >
              Markets
            </a>
            <a
              href="#brokers"
              onClick={(e) => {
                e.preventDefault();
                alert('Integrated Brokers: Trade directly through paper trading or supported broker connections.');
              }}
              className="hover:text-blue-600 transition-colors"
            >
              Brokers
            </a>

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                More
                <ChevronDown className="w-3.5 h-3.5 text-[#787B86]" />
              </button>

              {isMoreOpen && (
                <div
                  onMouseLeave={() => setIsMoreOpen(false)}
                  className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-[#1e222d] border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl py-2 text-xs font-medium z-50 animate-in fade-in slide-in-from-top-1"
                >
                  <a
                    href="#screener"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMoreOpen(false);
                      onOpenSearch();
                    }}
                    className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#2a2e39] text-[#131722] dark:text-gray-200"
                  >
                    Stock Screener
                  </a>
                  <a
                    href="#economic-calendar"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMoreOpen(false);
                      const el = document.getElementById('us-stocks');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#2a2e39] text-[#131722] dark:text-gray-200"
                  >
                    Economic Calendar
                  </a>
                  <a
                    href="#heatmaps"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMoreOpen(false);
                      const el = document.getElementById('crypto');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#2a2e39] text-[#131722] dark:text-gray-200"
                  >
                    Crypto Heatmaps
                  </a>
                  <div className="border-t border-gray-100 dark:border-gray-800 my-1" />
                  <a
                    href="#pine-script"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMoreOpen(false);
                      alert('Pine Script™ is TradingView\'s programming language for creating custom technical indicators.');
                    }}
                    className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#2a2e39] text-[#131722] dark:text-gray-200"
                  >
                    Pine Script™ Editor
                  </a>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Data Feed Pulse Indicator */}
          <button
            onClick={onToggleLive}
            title={isLive ? 'Live price feed active (Click to pause)' : 'Price feed paused (Click to resume)'}
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
              isLive
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="hidden sm:inline">{isLive ? 'Live' : 'Paused'}</span>
          </button>

          {/* Watchlist Quick Button */}
          <button
            onClick={onOpenWatchlist}
            className="relative p-2 text-[#131722] dark:text-gray-300 hover:text-blue-600 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-[#1e222d]"
            title="Open Watchlist"
          >
            <Star className="w-4 h-4" />
            {watchlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleDark}
            className="p-2 text-[#131722] dark:text-gray-300 hover:text-blue-600 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-[#1e222d]"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#131722] dark:text-[#d1d4dc] hover:text-blue-600 p-2 rounded-md transition-colors"
              title="Change Language"
              type="button"
            >
              <Globe className="w-4 h-4" />
              <span>{selectedLang}</span>
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-[#1e222d] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50 text-xs">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setSelectedLang(l);
                      setIsLangOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <span>{l}</span>
                    {selectedLang === l && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Avatar/Icon */}
          <button
            onClick={onOpenAuth}
            aria-label="User profile"
            className="p-2 text-[#131722] dark:text-[#d1d4dc] hover:text-blue-600 rounded-full transition-colors"
            type="button"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Get Started Button */}
          <button
            onClick={onOpenAuth}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-full transition-shadow shadow hover:shadow-md cursor-pointer whitespace-nowrap"
            type="button"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};
