import React from 'react';
import { X, Trash2, Star, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { MarketItem } from '../types/market';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistItems: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  onRemoveItem: (item: MarketItem) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlistItems,
  onSelectItem,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  const totalGainLoss = watchlistItems.reduce((acc, curr) => acc + curr.changePercent, 0) / (watchlistItems.length || 1);
  const isNetPositive = totalGainLoss >= 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-[#131722] text-[#131722] dark:text-[#d1d4dc] border-l border-[#E0E3EB] dark:border-[#2a2e39] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-[#E0E3EB] dark:border-[#2a2e39] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3 className="font-bold text-base text-[#131722] dark:text-white">Watchlist</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 font-semibold text-gray-600 dark:text-gray-300">
              {watchlistItems.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Watchlist summary badge */}
        {watchlistItems.length > 0 && (
          <div className="px-5 py-3 border-b border-[#E0E3EB] dark:border-[#2a2e39] bg-[#F8F9FD] dark:bg-[#1e222d] flex items-center justify-between text-xs font-semibold">
            <span className="text-[#787B86] dark:text-[#848e9c]">Avg. Daily Movement:</span>
            <span
              className={`font-bold tabular-nums ${
                isNetPositive ? 'text-[#089981]' : 'text-[#F23645]'
              }`}
            >
              {isNetPositive ? `+${totalGainLoss.toFixed(2)}%` : `${totalGainLoss.toFixed(2)}%`}
            </span>
          </div>
        )}

        {/* Watchlist Items List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 divide-y divide-gray-100 dark:divide-[#2a2e39]">
          {watchlistItems.length === 0 ? (
            <div className="py-16 text-center px-6">
              <Star className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <h4 className="font-bold text-sm text-[#131722] dark:text-white">Your watchlist is empty</h4>
              <p className="text-xs text-[#787B86] dark:text-[#848e9c] mt-1">
                Click the star icon next to any asset or in the Superchart modal to keep track of real-time quotes here.
              </p>
            </div>
          ) : (
            watchlistItems.map((item) => {
              const isPositive = item.changePercent >= 0;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  className="py-3 px-2 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#1e222d] rounded-xl cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold text-sm text-[#131722] dark:text-white group-hover:text-blue-600 transition-colors">
                        {item.symbol}
                      </div>
                      <div className="text-xs text-[#787B86] dark:text-[#848e9c] truncate max-w-[130px]">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-semibold text-xs text-[#131722] dark:text-white tabular-nums">
                        {item.price.toFixed(item.price > 10 ? 2 : 4)}
                      </div>
                      <div
                        className={`text-xs font-bold tabular-nums ${
                          isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveItem(item);
                      }}
                      title="Remove from watchlist"
                      className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-950/40 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
