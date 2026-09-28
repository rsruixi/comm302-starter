import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketItem } from '../types/market';

interface ForexCommoditiesSectionProps {
  forexItems: MarketItem[];
  commodityItems: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  flashingIds: Record<string, 'up' | 'down'>;
}

export const ForexCommoditiesSection: React.FC<ForexCommoditiesSectionProps> = ({
  forexItems,
  commodityItems,
  onSelectItem,
  flashingIds,
}) => {
  return (
    <section className="space-y-6 pt-4" id="forex">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Currencies Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <a
              href="#forex"
              onClick={(e) => {
                e.preventDefault();
                if (forexItems[0]) onSelectItem(forexItems[0]);
              }}
              className="group inline-flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight text-[#131722] dark:text-white hover:text-blue-600 transition-colors"
            >
              <span>Forex & Currencies</span>
              <ChevronRight className="w-5 h-5 stroke-[2.5] text-[#131722] dark:text-white group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <span className="text-xs font-semibold text-[#787B86] dark:text-[#848e9c]">Real-time</span>
          </div>

          <div className="border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl divide-y divide-[#E0E3EB] dark:divide-[#2a2e39] bg-white dark:bg-[#1e222d] shadow-xs overflow-hidden">
            {forexItems.slice(0, 4).map((item) => {
              const isPositive = item.changePercent >= 0;
              const flash = flashingIds[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className={`p-3.5 flex items-center justify-between hover:bg-[#F8F9FD] dark:hover:bg-[#2a2e39]/50 transition-colors cursor-pointer ${
                    flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="font-black text-sm text-[#131722] dark:text-white">{item.symbol}</div>
                    <span className="text-xs text-[#787B86] dark:text-[#848e9c]">{item.name}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-sm text-[#131722] dark:text-white tabular-nums">
                      {item.price.toFixed(item.price > 10 ? 2 : 4)}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded tabular-nums min-w-[62px] text-right ${
                        isPositive
                          ? 'bg-[#E6F4F1] dark:bg-emerald-950/60 text-[#089981]'
                          : 'bg-[#FDE8E9] dark:bg-red-950/60 text-[#F23645]'
                      }`}
                    >
                      {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Commodities Column */}
        <div className="space-y-4" id="futures">
          <div className="flex items-center justify-between">
            <a
              href="#futures"
              onClick={(e) => {
                e.preventDefault();
                if (commodityItems[0]) onSelectItem(commodityItems[0]);
              }}
              className="group inline-flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight text-[#131722] dark:text-white hover:text-blue-600 transition-colors"
            >
              <span>Commodities & Futures</span>
              <ChevronRight className="w-5 h-5 stroke-[2.5] text-[#131722] dark:text-white group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <span className="text-xs font-semibold text-[#787B86] dark:text-[#848e9c]">CME & NYMEX</span>
          </div>

          <div className="border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl divide-y divide-[#E0E3EB] dark:divide-[#2a2e39] bg-white dark:bg-[#1e222d] shadow-xs overflow-hidden">
            {commodityItems.slice(0, 4).map((item) => {
              const isPositive = item.changePercent >= 0;
              const flash = flashingIds[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className={`p-3.5 flex items-center justify-between hover:bg-[#F8F9FD] dark:hover:bg-[#2a2e39]/50 transition-colors cursor-pointer ${
                    flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="font-black text-sm text-[#131722] dark:text-white">{item.symbol}</div>
                    <span className="text-xs text-[#787B86] dark:text-[#848e9c]">{item.name}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-sm text-[#131722] dark:text-white tabular-nums">
                      {item.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded tabular-nums min-w-[62px] text-right ${
                        isPositive
                          ? 'bg-[#E6F4F1] dark:bg-emerald-950/60 text-[#089981]'
                          : 'bg-[#FDE8E9] dark:bg-red-950/60 text-[#F23645]'
                      }`}
                    >
                      {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
