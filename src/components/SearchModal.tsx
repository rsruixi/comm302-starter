import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, ArrowRight, CornerDownLeft, Star } from 'lucide-react';
import { MarketItem } from '../types/market';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allItems: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  allItems,
  onSelectItem,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'us-stocks', label: 'Stocks' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'forex', label: 'Forex' },
    { id: 'indices', label: 'Indices' },
    { id: 'futures', label: 'Futures' },
    { id: 'bonds', label: 'Bonds' },
  ];

  const filteredItems = allItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const q = query.toLowerCase().trim();
    const matchesQuery =
      !q ||
      item.symbol.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      (item.sector && item.sector.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filteredItems.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        onSelectItem(filteredItems[selectedIndex]);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-3 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#131722] text-[#131722] dark:text-[#d1d4dc] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search input line */}
        <div className="p-4 border-b border-[#E0E3EB] dark:border-[#2a2e39] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#787B86] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search symbol, company, currency or commodity..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-[#131722] dark:text-white outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-500 rounded border border-gray-200 dark:border-gray-700">
            ESC
          </kbd>
        </div>

        {/* Category filter pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#E0E3EB] dark:border-[#2a2e39] bg-[#F8F9FD] dark:bg-[#1e222d] overflow-x-auto text-xs font-semibold custom-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCategory(c.id);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'bg-white dark:bg-[#131722] text-[#787B86] dark:text-gray-300 hover:text-black dark:hover:text-white border border-gray-200 dark:border-gray-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 divide-y divide-gray-100 dark:divide-[#2a2e39]">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-[#787B86] dark:text-[#848e9c] text-sm">
              No matching symbols found for "<span className="font-bold">{query}</span>"
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              const isPositive = item.changePercent >= 0;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`px-3 py-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-[#131722] dark:text-white w-20">
                      {item.symbol}
                    </span>
                    <span className="text-xs text-[#787B86] dark:text-[#848e9c] truncate max-w-[200px] sm:max-w-xs">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="font-semibold text-xs tabular-nums text-[#131722] dark:text-white">
                        {item.price.toFixed(item.price > 10 ? 2 : 4)} {item.currency}
                      </div>
                      <div
                        className={`text-[11px] font-bold tabular-nums ${
                          isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 uppercase">
                      {item.category.replace('-', ' ')}
                    </span>

                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-blue-600 hidden sm:inline" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 border-t border-[#E0E3EB] dark:border-[#2a2e39] bg-[#F8F9FD] dark:bg-[#1e222d] text-[11px] text-[#787B86] dark:text-[#848e9c] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>esc to dismiss</span>
          </div>
          <span>TradingView Global Search</span>
        </div>
      </div>
    </div>
  );
};
