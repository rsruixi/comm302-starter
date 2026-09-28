import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketItem } from '../types/market';

interface BondsEtfsSectionProps {
  onSelectItem: (item: MarketItem) => void;
  flashingIds: Record<string, 'up' | 'down'>;
}

export const BondsEtfsSection: React.FC<BondsEtfsSectionProps> = ({
  onSelectItem,
  flashingIds,
}) => {
  const bonds: MarketItem[] = [
    {
      id: 'us10y',
      symbol: 'US10Y',
      name: 'US 10-Year Treasury Yield',
      category: 'bonds',
      price: 4.42,
      change: -0.03,
      changePercent: -0.68,
      currency: '%',
      subText: 'Benchmark Yield',
      sparkline: [4.48, 4.46, 4.45, 4.43, 4.42],
    },
    {
      id: 'us2y',
      symbol: 'US02Y',
      name: 'US 2-Year Treasury Yield',
      category: 'bonds',
      price: 4.25,
      change: -0.02,
      changePercent: -0.47,
      currency: '%',
      subText: 'Short Duration',
      sparkline: [4.3, 4.28, 4.27, 4.26, 4.25],
    },
    {
      id: 'de10y',
      symbol: 'DE10Y',
      name: 'Germany 10Y Bund',
      category: 'bonds',
      price: 2.35,
      change: 0.01,
      changePercent: 0.43,
      currency: '%',
      subText: 'Euro Benchmark',
      sparkline: [2.32, 2.33, 2.34, 2.34, 2.35],
    },
  ];

  const etfs: MarketItem[] = [
    {
      id: 'spy',
      symbol: 'SPY',
      name: 'SPDR S&P 500 ETF Trust',
      category: 'etfs',
      price: 597.80,
      change: 2.85,
      changePercent: 0.48,
      currency: 'USD',
      marketCap: '$605B',
      sparkline: [12, 14, 15, 18, 20],
      openPrice: 595.5,
    },
    {
      id: 'qqq',
      symbol: 'QQQ',
      name: 'Invesco QQQ Trust (Nasdaq 100)',
      category: 'etfs',
      price: 512.40,
      change: 4.30,
      changePercent: 0.85,
      currency: 'USD',
      marketCap: '$310B',
      sparkline: [14, 16, 18, 22, 25],
      openPrice: 508.9,
    },
    {
      id: 'smh',
      symbol: 'SMH',
      name: 'VanEck Semiconductor ETF',
      category: 'etfs',
      price: 254.20,
      change: 5.60,
      changePercent: 2.25,
      currency: 'USD',
      marketCap: '$24B',
      sparkline: [10, 14, 18, 24, 28],
      openPrice: 249.2,
    },
  ];

  const economyIndicators = [
    { title: 'US Inflation Rate (YoY)', value: '2.6%', previous: '2.4%', note: 'Within Fed tolerance' },
    { title: 'Federal Funds Target Rate', value: '4.50% - 4.75%', previous: '4.75% - 5.00%', note: 'FOMC policy' },
    { title: 'US GDP Annualized (Q3)', value: '2.8%', previous: '3.0%', note: 'Resilient growth' },
    { title: 'Unemployment Rate', value: '4.1%', previous: '4.1%', note: 'Stable labor market' },
  ];

  return (
    <div className="space-y-12">
      {/* Bonds Section */}
      <section className="space-y-4 pt-4" id="bonds">
        <div className="flex items-center justify-between">
          <div className="group inline-flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight text-[#131722] dark:text-white">
            <span>Government Bonds & Sovereign Yields</span>
            <ChevronRight className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-[#787B86] dark:text-[#848e9c]">Benchmark Yields</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {bonds.map((b) => {
            const isPositive = b.change >= 0;
            return (
              <div
                key={b.id}
                onClick={() => onSelectItem(b)}
                className="p-4 rounded-xl border border-[#E0E3EB] dark:border-[#2a2e39] bg-white dark:bg-[#1e222d] hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-[#131722] dark:text-white">{b.symbol}</span>
                    <p className="text-xs text-[#787B86] dark:text-[#848e9c]">{b.name}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      isPositive ? 'bg-[#E6F4F1] text-[#089981]' : 'bg-[#FDE8E9] text-[#F23645]'
                    }`}
                  >
                    {isPositive ? `+${b.change.toFixed(2)}` : b.change.toFixed(2)} pts
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold tabular-nums text-[#131722] dark:text-white">
                    {b.price.toFixed(2)}%
                  </span>
                  <span className="text-xs text-[#787B86] dark:text-[#848e9c]">{b.subText}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ETFs Section */}
      <section className="space-y-4 pt-2" id="etfs">
        <div className="flex items-center justify-between">
          <div className="group inline-flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight text-[#131722] dark:text-white">
            <span>Exchange Traded Funds (ETFs)</span>
            <ChevronRight className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-[#787B86] dark:text-[#848e9c]">Major Funds</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {etfs.map((e) => {
            const isPositive = e.changePercent >= 0;
            return (
              <div
                key={e.id}
                onClick={() => onSelectItem(e)}
                className="p-4 rounded-xl border border-[#E0E3EB] dark:border-[#2a2e39] bg-white dark:bg-[#1e222d] hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-[#131722] dark:text-white">{e.symbol}</span>
                    <p className="text-xs text-[#787B86] dark:text-[#848e9c] truncate max-w-[150px]">
                      {e.name}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      isPositive ? 'bg-[#E6F4F1] text-[#089981]' : 'bg-[#FDE8E9] text-[#F23645]'
                    }`}
                  >
                    {isPositive ? `+${e.changePercent.toFixed(2)}%` : `${e.changePercent.toFixed(2)}%`}
                  </span>
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-2xl font-bold tabular-nums text-[#131722] dark:text-white">
                    ${e.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-[#787B86] dark:text-[#848e9c]">AUM: {e.marketCap}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Economy Overview */}
      <section className="space-y-4 pt-2" id="economy">
        <div className="flex items-center justify-between">
          <div className="group inline-flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight text-[#131722] dark:text-white">
            <span>Global Macro Economy</span>
            <ChevronRight className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-[#787B86] dark:text-[#848e9c]">Macro Indicators</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {economyIndicators.map((ind, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[#E0E3EB] dark:border-[#2a2e39] bg-white dark:bg-[#1e222d] shadow-xs"
            >
              <span className="text-xs text-[#787B86] dark:text-[#848e9c]">{ind.title}</span>
              <div className="text-2xl font-black text-[#131722] dark:text-white mt-1 tabular-nums">
                {ind.value}
              </div>
              <div className="text-xs text-[#787B86] dark:text-[#848e9c] mt-2 flex items-center justify-between">
                <span>Prev: {ind.previous}</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">{ind.note}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
