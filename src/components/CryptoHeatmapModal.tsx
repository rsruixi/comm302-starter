import React from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { MarketItem } from '../types/market';

interface CryptoHeatmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  cryptoItems: MarketItem[];
  onSelectCrypto: (crypto: MarketItem) => void;
}

export const CryptoHeatmapModal: React.FC<CryptoHeatmapModalProps> = ({
  isOpen,
  onClose,
  cryptoItems,
  onSelectCrypto,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#131722] text-[#131722] dark:text-[#d1d4dc] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0E3EB] dark:border-[#2a2e39] flex items-center justify-between bg-white dark:bg-[#1e222d]/60">
          <div>
            <h2 className="text-xl font-black text-[#131722] dark:text-white flex items-center gap-2">
              <span>Crypto Market Heatmap</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                24h Performance
              </span>
            </h2>
            <p className="text-xs text-[#787B86] dark:text-[#848e9c] mt-0.5">
              Treemap block size is proportional to market capitalization. Color reflects 24-hour price change.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Heatmap Grid */}
        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-12 gap-3 min-h-[420px]">
            {/* Bitcoin - 6 cols, tall */}
            {cryptoItems[0] && (
              <div
                onClick={() => {
                  onSelectCrypto(cryptoItems[0]);
                  onClose();
                }}
                className={`col-span-12 md:col-span-7 row-span-2 rounded-xl p-5 flex flex-col justify-between transition-transform hover:scale-[1.01] cursor-pointer shadow-sm ${
                  cryptoItems[0].changePercent >= 0
                    ? 'bg-[#089981] hover:bg-[#078873] text-white'
                    : 'bg-[#F23645] hover:bg-[#d92c3a] text-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-2xl font-black">{cryptoItems[0].symbol}</span>
                    <p className="text-sm opacity-90">{cryptoItems[0].name}</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-black/25 rounded-md">
                    Cap: {cryptoItems[0].marketCap}
                  </span>
                </div>
                <div className="mt-8">
                  <div className="text-3xl font-black tabular-nums">
                    ${cryptoItems[0].price.toLocaleString()}
                  </div>
                  <div className="text-lg font-bold mt-1">
                    +{cryptoItems[0].changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            )}

            {/* Ethereum - 5 cols */}
            {cryptoItems[1] && (
              <div
                onClick={() => {
                  onSelectCrypto(cryptoItems[1]);
                  onClose();
                }}
                className={`col-span-12 md:col-span-5 rounded-xl p-4 flex flex-col justify-between transition-transform hover:scale-[1.01] cursor-pointer shadow-sm ${
                  cryptoItems[1].changePercent >= 0
                    ? 'bg-[#089981] hover:bg-[#078873] text-white'
                    : 'bg-[#F23645] hover:bg-[#d92c3a] text-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xl font-black">{cryptoItems[1].symbol}</span>
                    <p className="text-xs opacity-90">{cryptoItems[1].name}</p>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 bg-black/25 rounded">
                    Cap: {cryptoItems[1].marketCap}
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-black tabular-nums mt-4">
                    ${cryptoItems[1].price.toLocaleString()}
                  </div>
                  <div className="text-sm font-bold mt-0.5">
                    +{cryptoItems[1].changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            )}

            {/* Solana */}
            {cryptoItems[2] && (
              <div
                onClick={() => {
                  onSelectCrypto(cryptoItems[2]);
                  onClose();
                }}
                className={`col-span-6 md:col-span-3 rounded-xl p-4 flex flex-col justify-between transition-transform hover:scale-[1.01] cursor-pointer shadow-sm ${
                  cryptoItems[2].changePercent >= 0
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-rose-600 hover:bg-rose-700 text-white'
                }`}
              >
                <div>
                  <span className="text-lg font-black">{cryptoItems[2].symbol}</span>
                  <p className="text-xs opacity-90">{cryptoItems[2].name}</p>
                </div>
                <div className="mt-4">
                  <div className="text-xl font-black tabular-nums">${cryptoItems[2].price.toFixed(2)}</div>
                  <div className="text-xs font-bold">+{cryptoItems[2].changePercent.toFixed(2)}%</div>
                </div>
              </div>
            )}

            {/* XRP */}
            {cryptoItems[3] && (
              <div
                onClick={() => {
                  onSelectCrypto(cryptoItems[3]);
                  onClose();
                }}
                className={`col-span-6 md:col-span-2 rounded-xl p-4 flex flex-col justify-between transition-transform hover:scale-[1.01] cursor-pointer shadow-sm ${
                  cryptoItems[3].changePercent >= 0
                    ? 'bg-[#089981] hover:bg-[#078873] text-white'
                    : 'bg-[#F23645] hover:bg-[#d92c3a] text-white'
                }`}
              >
                <div>
                  <span className="text-lg font-black">{cryptoItems[3].symbol}</span>
                  <p className="text-xs opacity-90">{cryptoItems[3].name}</p>
                </div>
                <div className="mt-4">
                  <div className="text-xl font-black tabular-nums">${cryptoItems[3].price.toFixed(2)}</div>
                  <div className="text-xs font-bold">{cryptoItems[3].changePercent.toFixed(2)}%</div>
                </div>
              </div>
            )}

            {/* Others (BNB, ADA, DOGE) */}
            {cryptoItems.slice(4).map((c) => {
              const isUp = c.changePercent >= 0;
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectCrypto(c);
                    onClose();
                  }}
                  className={`col-span-6 md:col-span-4 rounded-xl p-4 flex flex-col justify-between transition-transform hover:scale-[1.01] cursor-pointer shadow-sm ${
                    isUp
                      ? 'bg-[#089981] hover:bg-[#078873] text-white'
                      : 'bg-[#F23645] hover:bg-[#d92c3a] text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base">{c.symbol}</span>
                    <span className="text-xs font-semibold opacity-90">{c.name}</span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="text-lg font-black tabular-nums">
                      ${c.price.toFixed(c.price > 10 ? 2 : 4)}
                    </span>
                    <span className="text-xs font-bold">
                      {isUp ? `+${c.changePercent.toFixed(2)}%` : `${c.changePercent.toFixed(2)}%`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
