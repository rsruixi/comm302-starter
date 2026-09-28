import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketItem } from '../types/market';

interface IndicesSectionProps {
  indices: MarketItem[];
  onSelectIndex: (item: MarketItem) => void;
  flashingIds: Record<string, 'up' | 'down'>;
}

export const IndicesSection: React.FC<IndicesSectionProps> = ({
  indices,
  onSelectIndex,
  flashingIds,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs = [
    { id: 'spx', label: 'S&P 500', badge: '500', badgeColor: 'bg-red-600' },
    { id: 'ndx', label: 'Nasdaq 100', badge: '100', badgeColor: 'bg-sky-500' },
    { id: 'dji', label: 'Dow 30', badge: '30', badgeColor: 'bg-blue-600' },
    { id: 'rut', label: 'US 2000' },
    { id: 'ixic', label: 'Nasdaq Composite' },
    { id: 'nya', label: 'NYSE Composite' },
  ];

  // Helper to render sparkline SVG
  const renderSparkline = (points: number[], isPositive: boolean) => {
    if (!points || points.length === 0) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 100;
    const height = 40;

    const pathData = points
      .map((val, idx) => {
        const x = (idx / (points.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 10) - 5;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');

    const strokeColor = isPositive ? '#089981' : '#F23645';

    return (
      <svg className="w-24 h-10 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
        <path
          d={pathData}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  // Display top 4 matching screenshot, or all if view all toggled
  const displayIndices = indices.slice(0, 4);

  return (
    <section className="space-y-6" id="indices">
      <div className="flex items-center justify-between">
        <a
          href="#indices"
          onClick={(e) => {
            e.preventDefault();
            if (indices[0]) onSelectIndex(indices[0]);
          }}
          className="group inline-flex items-center gap-2 text-2xl md:text-3xl font-bold tracking-tight text-[#131722] dark:text-white hover:text-blue-600 transition-colors"
        >
          <span>Indices</span>
          <ChevronRight className="w-6 h-6 stroke-[2.5] text-[#131722] dark:text-white group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
        </a>
        <button
          onClick={() => {
            if (indices[0]) onSelectIndex(indices[0]);
          }}
          className="text-sm font-semibold text-blue-600 hover:underline hidden sm:inline-flex items-center gap-1 cursor-pointer"
        >
          See all major indices
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Indices Sub-tabs matching screenshot */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 text-sm font-medium custom-scrollbar">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                const target = indices.find((idx) => idx.id === tab.id);
                if (target) onSelectIndex(target);
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-[#F0F3FA] dark:bg-[#1e222d] border-[#E0E3EB] dark:border-gray-600 text-[#131722] dark:text-white font-semibold shadow-xs'
                  : 'bg-white dark:bg-[#131722] text-[#787B86] dark:text-gray-300 border-[#E0E3EB] dark:border-[#2a2e39] hover:bg-gray-50 dark:hover:bg-[#1e222d] hover:text-[#131722] dark:hover:text-white'
              }`}
            >
              {tab.badge && (
                <span
                  className={`w-6 h-6 rounded-full ${tab.badgeColor} text-white font-bold text-[10px] flex items-center justify-center`}
                >
                  {tab.badge}
                </span>
              )}
              <span className="text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Indices Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayIndices.map((item) => {
          const isPositive = item.changePercent >= 0;
          const flash = flashingIds[item.id];
          return (
            <div
              key={item.id}
              onClick={() => onSelectIndex(item)}
              role="button"
              tabIndex={0}
              className={`p-4 rounded-xl border border-[#E0E3EB] dark:border-[#2a2e39] bg-white dark:bg-[#1e222d] hover:shadow-md transition-all relative cursor-pointer group ${
                flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span
                        className={`w-5 h-5 rounded-full ${item.badgeColor} text-white font-bold text-[10px] flex items-center justify-center`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <span className="font-bold text-base text-[#131722] dark:text-white group-hover:text-blue-600 transition-colors">
                      {item.symbol}
                    </span>
                  </div>
                  <p className="text-xs text-[#787B86] dark:text-[#848e9c] mt-0.5">{item.name}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    isPositive
                      ? 'bg-[#E6F4F1] dark:bg-emerald-950/60 text-[#089981] dark:text-emerald-400'
                      : 'bg-[#FDE8E9] dark:bg-red-950/60 text-[#F23645] dark:text-red-400'
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
                      isPositive ? 'text-[#089981] dark:text-emerald-400' : 'text-[#F23645] dark:text-red-400'
                    }`}
                  >
                    {isPositive ? `+${item.change.toFixed(2)}` : item.change.toFixed(2)} {item.currency}
                  </div>
                </div>

                {/* Sparkline */}
                {renderSparkline(item.sparkline, isPositive)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
