import React from 'react';
import { ChevronRight, Globe } from 'lucide-react';
import { MarketItem } from '../types/market';

interface WorldStocksSectionProps {
  onSelectItem: (item: MarketItem) => void;
  flashingIds: Record<string, 'up' | 'down'>;
}

export const WorldStocksSection: React.FC<WorldStocksSectionProps> = ({
  onSelectItem,
  flashingIds,
}) => {
  const worldIndices: MarketItem[] = [
    {
      id: 'dax',
      symbol: 'DAX',
      name: 'DAX 40 (Germany)',
      category: 'world-stocks',
      price: 19450.80,
      change: 68.20,
      changePercent: 0.35,
      currency: 'EUR',
      badge: 'DE',
      badgeColor: 'bg-yellow-600',
      sparkline: [12, 14, 16, 20, 22],
      openPrice: 19390.00,
      exchange: 'XETRA',
    },
    {
      id: 'ftse',
      symbol: 'FTSE 100',
      name: 'FTSE 100 (UK)',
      category: 'world-stocks',
      price: 8320.10,
      change: -12.40,
      changePercent: -0.15,
      currency: 'GBP',
      badge: 'UK',
      badgeColor: 'bg-red-600',
      sparkline: [22, 19, 18, 16, 14],
      openPrice: 8335.00,
      exchange: 'LSE',
    },
    {
      id: 'hsi',
      symbol: 'HSI',
      name: 'Hang Seng (Hong Kong)',
      category: 'world-stocks',
      price: 19680.50,
      change: 245.80,
      changePercent: 1.26,
      currency: 'HKD',
      badge: 'HK',
      badgeColor: 'bg-rose-500',
      sparkline: [10, 14, 18, 24, 28],
      openPrice: 19450.00,
      exchange: 'HKEX',
    },
    {
      id: 'cac',
      symbol: 'CAC 40',
      name: 'CAC 40 (France)',
      category: 'world-stocks',
      price: 7215.30,
      change: 14.10,
      changePercent: 0.20,
      currency: 'EUR',
      badge: 'FR',
      badgeColor: 'bg-blue-600',
      sparkline: [14, 16, 15, 17, 18],
      openPrice: 7205.00,
      exchange: 'EURONEXT',
    },
  ];

  return (
    <section className="space-y-6 pt-4" id="world-stocks">
      <div className="flex items-center justify-between">
        <a
          href="#world-stocks"
          className="group inline-flex items-center gap-2 text-2xl md:text-3xl font-bold tracking-tight text-[#131722] dark:text-white hover:text-blue-600 transition-colors"
        >
          <span>World Stocks & Global Indices</span>
          <ChevronRight className="w-6 h-6 stroke-[2.5] text-[#131722] dark:text-white group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
        </a>
        <span className="text-xs font-semibold text-[#787B86] dark:text-[#848e9c]">Major Exchanges</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {worldIndices.map((item) => {
          const isPositive = item.changePercent >= 0;
          const flash = flashingIds[item.id];
          return (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              role="button"
              tabIndex={0}
              className={`p-4 rounded-xl border border-[#E0E3EB] dark:border-[#2a2e39] bg-white dark:bg-[#1e222d] hover:shadow-md transition-all relative cursor-pointer group ${
                flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-full ${item.badgeColor} text-white font-bold text-[10px] flex items-center justify-center`}
                    >
                      {item.badge}
                    </span>
                    <span className="font-bold text-base text-[#131722] dark:text-white group-hover:text-blue-600 transition-colors">
                      {item.symbol}
                    </span>
                  </div>
                  <p className="text-xs text-[#787B86] dark:text-[#848e9c] mt-0.5">{item.name}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    isPositive
                      ? 'bg-[#E6F4F1] dark:bg-emerald-950/60 text-[#089981]'
                      : 'bg-[#FDE8E9] dark:bg-red-950/60 text-[#F23645]'
                  }`}
                >
                  {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                </span>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold tracking-tight text-[#131722] dark:text-white tabular-nums">
                    {item.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div
                    className={`text-xs font-medium tabular-nums ${
                      isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPositive ? `+${item.change.toFixed(2)}` : item.change.toFixed(2)} {item.currency}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-semibold text-[#787B86] dark:text-[#848e9c] bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                    {item.exchange}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
