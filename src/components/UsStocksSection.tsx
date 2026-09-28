import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketItem, EarningsItem } from '../types/market';

interface UsStocksSectionProps {
  stocks: MarketItem[];
  earnings: EarningsItem[];
  onSelectStock: (stock: MarketItem) => void;
  onOpenScreener: () => void;
  onOpenCalendar: () => void;
  flashingIds: Record<string, 'up' | 'down'>;
}

export const UsStocksSection: React.FC<UsStocksSectionProps> = ({
  stocks,
  earnings,
  onSelectStock,
  onOpenScreener,
  onOpenCalendar,
  flashingIds,
}) => {
  const trendingTickers = [
    'NVDA',
    'AAPL',
    'TSLA',
    'AMD',
    'AMZN',
    'COIN',
    'PLTR',
    'META',
    'MSFT',
    'AVGO',
  ];

  // Most active stocks (top 4 by volume)
  const mostActive = stocks.filter((s) =>
    ['NVDA', 'TSLA', 'AAPL', 'AMD'].includes(s.symbol)
  );

  // Top gainers (top 4)
  const topGainers = stocks.filter((s) =>
    ['PLTR', 'COIN', 'MSTR', 'MARA'].includes(s.symbol)
  );

  const handleTickerClick = (symbol: string) => {
    const found = stocks.find((s) => s.symbol === symbol);
    if (found) {
      onSelectStock(found);
    }
  };

  return (
    <section className="space-y-6 pt-4" id="us-stocks">
      <div className="flex items-center justify-between">
        <a
          href="#us-stocks"
          onClick={(e) => {
            e.preventDefault();
            onOpenScreener();
          }}
          className="group inline-flex items-center gap-2 text-2xl md:text-3xl font-bold tracking-tight text-[#131722] dark:text-white hover:text-blue-600 transition-colors"
        >
          <span>US Stocks</span>
          <ChevronRight className="w-6 h-6 stroke-[2.5] text-[#131722] dark:text-white group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
        </a>
        <button
          onClick={onOpenScreener}
          className="text-sm font-semibold text-blue-600 hover:underline hidden sm:inline-flex items-center gap-1 cursor-pointer"
        >
          Open Stock Screener
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Ticker Community Trends */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar text-xs font-semibold">
        <span className="text-[#787B86] dark:text-[#848e9c] mr-1">Trending:</span>
        {trendingTickers.map((t) => (
          <button
            key={t}
            onClick={() => handleTickerClick(t)}
            className="px-2.5 py-1 rounded bg-[#F8F9FD] dark:bg-[#1e222d] hover:bg-[#F0F3FA] dark:hover:bg-[#2a2e39] text-[#131722] dark:text-white border border-[#E0E3EB] dark:border-[#2a2e39] transition-colors cursor-pointer"
          >
            {t}
          </button>
        ))}
      </div>

      {/* 3-Column Stock Movers & Tables Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Most Active / Volume */}
        <div className="border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl p-5 bg-white dark:bg-[#1e222d] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E0E3EB] dark:border-[#2a2e39]">
            <h3 className="font-bold text-base text-[#131722] dark:text-white">Most Active Stocks</h3>
            <span className="text-xs text-[#787B86] dark:text-[#848e9c]">By Volume</span>
          </div>

          <div className="divide-y divide-[#E0E3EB] dark:divide-[#2a2e39] text-sm">
            {mostActive.map((stock) => {
              const isPositive = stock.changePercent >= 0;
              const flash = flashingIds[stock.id];
              return (
                <div
                  key={stock.id}
                  onClick={() => onSelectStock(stock)}
                  className={`py-3 flex items-center justify-between hover:bg-[#F8F9FD] dark:hover:bg-[#2a2e39]/50 px-2 -mx-2 rounded transition-colors cursor-pointer ${
                    flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${stock.badgeColor || 'bg-gray-100 text-gray-700'} font-bold text-xs flex items-center justify-center`}
                    >
                      {stock.badge || stock.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-bold text-[#131722] dark:text-white">{stock.symbol}</div>
                      <div className="text-xs text-[#787B86] dark:text-[#848e9c] truncate max-w-[120px]">
                        {stock.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold text-[#131722] dark:text-white tabular-nums">
                      {stock.price.toFixed(2)}
                    </div>
                    <div
                      className={`text-xs font-semibold tabular-nums ${
                        isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPositive ? `+${stock.changePercent.toFixed(2)}%` : `${stock.changePercent.toFixed(2)}%`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={onOpenScreener}
            className="w-full text-center mt-3 pt-2 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            View full active list
          </button>
        </div>

        {/* Column 2: Top Gainers */}
        <div className="border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl p-5 bg-white dark:bg-[#1e222d] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E0E3EB] dark:border-[#2a2e39]">
            <h3 className="font-bold text-base text-[#131722] dark:text-white">Top Gainers</h3>
            <span className="text-xs font-semibold text-[#089981]">US Markets</span>
          </div>

          <div className="divide-y divide-[#E0E3EB] dark:divide-[#2a2e39] text-sm">
            {topGainers.map((stock) => {
              const flash = flashingIds[stock.id];
              return (
                <div
                  key={stock.id}
                  onClick={() => onSelectStock(stock)}
                  className={`py-3 flex items-center justify-between hover:bg-[#F8F9FD] dark:hover:bg-[#2a2e39]/50 px-2 -mx-2 rounded transition-colors cursor-pointer ${
                    flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E6F4F1] dark:bg-emerald-950/60 text-[#089981] font-bold text-xs flex items-center justify-center">
                      +
                    </div>
                    <div>
                      <div className="font-bold text-[#131722] dark:text-white">{stock.symbol}</div>
                      <div className="text-xs text-[#787B86] dark:text-[#848e9c] truncate max-w-[120px]">
                        {stock.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold text-[#131722] dark:text-white tabular-nums">
                      {stock.price.toFixed(2)}
                    </div>
                    <div className="text-xs font-bold text-white bg-[#089981] px-2 py-0.5 rounded tabular-nums">
                      +{stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={onOpenScreener}
            className="w-full text-center mt-3 pt-2 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            View all gainers
          </button>
        </div>

        {/* Column 3: Upcoming Earnings Calendar */}
        <div className="border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl p-5 bg-white dark:bg-[#1e222d] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E0E3EB] dark:border-[#2a2e39]">
            <h3 className="font-bold text-base text-[#131722] dark:text-white">Earnings Calendar</h3>
            <span className="text-xs font-semibold text-blue-600">Today</span>
          </div>

          <div className="divide-y divide-[#E0E3EB] dark:divide-[#2a2e39] text-sm">
            {earnings.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={onOpenCalendar}
                className="py-3 flex items-center justify-between hover:bg-[#F8F9FD] dark:hover:bg-[#2a2e39]/50 px-2 -mx-2 rounded transition-colors cursor-pointer"
              >
                <div>
                  <div className="flex items-center">
                    <span className="font-bold text-[#131722] dark:text-white">{item.symbol}</span>
                    <span className="text-xs text-[#787B86] dark:text-[#848e9c] ml-1.5 truncate max-w-[110px]">
                      {item.companyName}
                    </span>
                  </div>
                  <div className="text-xs text-[#787B86] dark:text-[#848e9c] mt-0.5">
                    Est. EPS: {item.estEps}
                  </div>
                </div>

                <span className="text-xs font-medium px-2 py-1 bg-[#F0F3FA] dark:bg-[#2a2e39] rounded text-[#131722] dark:text-gray-200 whitespace-nowrap">
                  {item.timing}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={onOpenCalendar}
            className="w-full text-center mt-3 pt-2 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            View complete economic calendar
          </button>
        </div>
      </div>
    </section>
  );
};
