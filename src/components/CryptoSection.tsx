import React, { useState } from 'react';
import { ChevronRight, ArrowUpDown, Star } from 'lucide-react';
import { MarketItem } from '../types/market';

interface CryptoSectionProps {
  cryptoItems: MarketItem[];
  onSelectCrypto: (crypto: MarketItem) => void;
  onOpenHeatmap: () => void;
  watchlistIds: string[];
  onToggleWatchlist: (item: MarketItem) => void;
  flashingIds: Record<string, 'up' | 'down'>;
}

export const CryptoSection: React.FC<CryptoSectionProps> = ({
  cryptoItems,
  onSelectCrypto,
  onOpenHeatmap,
  watchlistIds,
  onToggleWatchlist,
  flashingIds,
}) => {
  const [sortField, setSortField] = useState<'price' | 'changePercent' | 'marketCap'>('marketCap');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const handleSort = (field: 'price' | 'changePercent' | 'marketCap') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const sortedItems = [...cryptoItems].sort((a, b) => {
    let valA = a[sortField] || 0;
    let valB = b[sortField] || 0;

    if (sortField === 'marketCap') {
      const parseCap = (c?: string) => {
        if (!c) return 0;
        const num = parseFloat(c.replace(/[^0-9.]/g, ''));
        if (c.includes('T')) return num * 1e12;
        if (c.includes('B')) return num * 1e9;
        if (c.includes('M')) return num * 1e6;
        return num;
      };
      valA = parseCap(a.marketCap);
      valB = parseCap(b.marketCap);
    }

    return sortAsc ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
  });

  const renderSparkline = (points: number[], isPositive: boolean) => {
    if (!points || points.length === 0) return null;
    const width = 80;
    const height = 24;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;

    const pathData = points
      .map((val, idx) => {
        const x = (idx / (points.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');

    const strokeColor = isPositive ? '#089981' : '#F23645';

    return (
      <svg className="w-20 h-6 mx-auto" viewBox={`0 0 ${width} ${height}`}>
        <path
          d={pathData}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <section className="space-y-6 pt-4" id="crypto">
      <div className="flex items-center justify-between">
        <a
          href="#crypto"
          onClick={(e) => {
            e.preventDefault();
            onOpenHeatmap();
          }}
          className="group inline-flex items-center gap-2 text-2xl md:text-3xl font-bold tracking-tight text-[#131722] dark:text-white hover:text-blue-600 transition-colors"
        >
          <span>Crypto</span>
          <ChevronRight className="w-6 h-6 stroke-[2.5] text-[#131722] dark:text-white group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
        </a>
        <button
          onClick={onOpenHeatmap}
          className="text-sm font-semibold text-blue-600 hover:underline hidden sm:inline-flex items-center gap-1 cursor-pointer"
        >
          Explore Crypto heatmaps
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* High Density Crypto Table */}
      <div className="border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl overflow-hidden shadow-xs bg-white dark:bg-[#1e222d]">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F8F9FD] dark:bg-[#131722] text-[#787B86] dark:text-[#848e9c] font-semibold text-xs border-b border-[#E0E3EB] dark:border-[#2a2e39]">
              <tr>
                <th scope="col" className="py-3.5 pl-5 pr-3">
                  Name
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort('price')}
                  className="py-3.5 px-3 text-right cursor-pointer hover:text-blue-600"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Price</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort('changePercent')}
                  className="py-3.5 px-3 text-right cursor-pointer hover:text-blue-600"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>24h Change</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th scope="col" className="py-3.5 px-3 text-right">
                  24h Volume
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort('marketCap')}
                  className="py-3.5 px-3 text-right cursor-pointer hover:text-blue-600"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Market Cap</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th scope="col" className="py-3.5 pr-5 pl-3 text-center">
                  Last 7 Days
                </th>
                <th scope="col" className="py-3.5 pr-4 pl-1 text-center w-10">
                  <span className="sr-only">Watchlist</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB] dark:divide-[#2a2e39] font-medium text-[#131722] dark:text-[#d1d4dc]">
              {sortedItems.map((item) => {
                const isPositive = item.changePercent >= 0;
                const isSaved = watchlistIds.includes(item.id);
                const flash = flashingIds[item.id];

                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectCrypto(item)}
                    className={`hover:bg-[#F8F9FD] dark:hover:bg-[#2a2e39]/50 transition-colors cursor-pointer ${
                      flash === 'up' ? 'flash-up' : flash === 'down' ? 'flash-down' : ''
                    }`}
                  >
                    <td className="py-3.5 pl-5 pr-3 flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full ${item.badgeColor || 'bg-amber-500 text-white'} font-black text-xs flex items-center justify-center shrink-0`}
                      >
                        {item.badge || item.symbol.slice(0, 1)}
                      </div>
                      <div>
                        <div className="font-bold text-[#131722] dark:text-white">
                          {item.name}{' '}
                          <span className="text-xs font-normal text-[#787B86] dark:text-[#848e9c]">
                            {item.symbol}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-right font-bold text-[#131722] dark:text-white tabular-nums">
                      $
                      {item.price >= 10
                        ? item.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : item.price.toFixed(4)}
                    </td>

                    <td
                      className={`py-3.5 px-3 text-right font-bold tabular-nums ${
                        isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                    </td>

                    <td className="py-3.5 px-3 text-right text-[#787B86] dark:text-[#848e9c] tabular-nums">
                      {item.volume24h}
                    </td>

                    <td className="py-3.5 px-3 text-right font-semibold text-[#131722] dark:text-white tabular-nums">
                      {item.marketCap}
                    </td>

                    <td className="py-3.5 pr-5 pl-3 text-center">
                      {renderSparkline(item.sparkline, isPositive)}
                    </td>

                    <td
                      className="py-3.5 pr-4 pl-1 text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWatchlist(item);
                      }}
                    >
                      <button
                        title={isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}
                        className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
                          isSaved ? 'text-amber-500' : 'text-gray-300 dark:text-gray-600 hover:text-amber-400'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
