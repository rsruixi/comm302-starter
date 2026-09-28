import React, { useState } from 'react';
import { X, Search, Filter, ArrowUpDown, ChevronDown, Check, Download } from 'lucide-react';
import { MarketItem } from '../types/market';

interface StockScreenerModalProps {
  isOpen: boolean;
  onClose: () => void;
  stocks: MarketItem[];
  onSelectStock: (stock: MarketItem) => void;
}

export const StockScreenerModal: React.FC<StockScreenerModalProps> = ({
  isOpen,
  onClose,
  stocks,
  onSelectStock,
}) => {
  if (!isOpen) return null;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedPerformance, setSelectedPerformance] = useState('All');
  const [sortField, setSortField] = useState<'price' | 'changePercent' | 'marketCap' | 'peRatio'>('marketCap');
  const [sortAsc, setSortAsc] = useState(false);

  const sectors = ['All', 'Technology', 'Financials', 'Consumer Cyclical', 'Communication Services'];

  const handleSort = (field: 'price' | 'changePercent' | 'marketCap' | 'peRatio') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const filtered = stocks.filter((stock) => {
    const matchSearch =
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSector = selectedSector === 'All' || stock.sector === selectedSector;
    const matchPerf =
      selectedPerformance === 'All' ||
      (selectedPerformance === 'Gainers' && stock.changePercent > 0) ||
      (selectedPerformance === 'Losers' && stock.changePercent < 0) ||
      (selectedPerformance === 'High Movers' && Math.abs(stock.changePercent) >= 2.5);

    return matchSearch && matchSector && matchPerf;
  });

  const sorted = [...filtered].sort((a, b) => {
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

  const exportCSV = () => {
    const headers = 'Symbol,Company,Sector,Price,ChangePercent,MarketCap,PE\n';
    const rows = sorted
      .map(
        (s) =>
          `"${s.symbol}","${s.name}","${s.sector || ''}",${s.price},${s.changePercent},"${s.marketCap || ''}",${s.peRatio || ''}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tradingview_stock_screener.csv';
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#131722] text-[#131722] dark:text-[#d1d4dc] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0E3EB] dark:border-[#2a2e39] flex items-center justify-between bg-white dark:bg-[#1e222d]/60">
          <div>
            <h2 className="text-xl font-black text-[#131722] dark:text-white flex items-center gap-2">
              <span>Stock Screener</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                US Markets
              </span>
            </h2>
            <p className="text-xs text-[#787B86] dark:text-[#848e9c] mt-0.5">
              Filter and analyze equities by volume, sector, performance, and valuation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              title="Export CSV"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="px-6 py-3 border-b border-[#E0E3EB] dark:border-[#2a2e39] bg-[#F8F9FD] dark:bg-[#131722] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-[240px]">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#787B86]" />
              <input
                type="text"
                placeholder="Search symbol or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-[#1e222d] text-xs text-[#131722] dark:text-white pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 outline-none focus:border-blue-600"
              />
            </div>

            {/* Sector Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#787B86] dark:text-[#848e9c]">Sector:</span>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="bg-white dark:bg-[#1e222d] text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[#131722] dark:text-white outline-none focus:border-blue-600 cursor-pointer"
              >
                {sectors.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Performance Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#787B86] dark:text-[#848e9c]">Performance:</span>
              <select
                value={selectedPerformance}
                onChange={(e) => setSelectedPerformance(e.target.value)}
                className="bg-white dark:bg-[#1e222d] text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[#131722] dark:text-white outline-none focus:border-blue-600 cursor-pointer"
              >
                <option value="All">All Movements</option>
                <option value="Gainers">Gainers (+)</option>
                <option value="Losers">Losers (-)</option>
                <option value="High Movers">High Movers (≥2.5%)</option>
              </select>
            </div>
          </div>

          <div className="text-xs font-semibold text-[#787B86] dark:text-[#848e9c]">
            Showing <strong className="text-[#131722] dark:text-white">{sorted.length}</strong> matching assets
          </div>
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#F8F9FD] dark:bg-[#1e222d] text-[#787B86] dark:text-[#848e9c] font-semibold border-b border-[#E0E3EB] dark:border-[#2a2e39] sticky top-0 z-10">
              <tr>
                <th className="py-3 px-5">Symbol & Name</th>
                <th className="py-3 px-3">Sector</th>
                <th
                  onClick={() => handleSort('price')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-blue-600"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Price</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('changePercent')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-blue-600"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Change %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('marketCap')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-blue-600"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Market Cap</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('peRatio')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-blue-600"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>P/E</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right">Volume</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB] dark:divide-[#2a2e39]">
              {sorted.map((stock) => {
                const isPositive = stock.changePercent >= 0;
                return (
                  <tr
                    key={stock.id}
                    onClick={() => {
                      onSelectStock(stock);
                      onClose();
                    }}
                    className="hover:bg-[#F8F9FD] dark:hover:bg-[#2a2e39]/50 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-5 flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full ${stock.badgeColor || 'bg-gray-100 text-gray-700'} font-bold text-[11px] flex items-center justify-center shrink-0`}
                      >
                        {stock.badge || stock.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <span className="font-bold text-sm text-[#131722] dark:text-white hover:text-blue-600">
                          {stock.symbol}
                        </span>
                        <div className="text-[11px] text-[#787B86] dark:text-[#848e9c]">
                          {stock.name}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-[#787B86] dark:text-[#848e9c]">
                      {stock.sector || 'General'}
                    </td>

                    <td className="py-3 px-3 text-right font-bold text-[#131722] dark:text-white tabular-nums">
                      ${stock.price.toFixed(2)}
                    </td>

                    <td
                      className={`py-3 px-3 text-right font-bold tabular-nums ${
                        isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPositive ? `+${stock.changePercent.toFixed(2)}%` : `${stock.changePercent.toFixed(2)}%`}
                    </td>

                    <td className="py-3 px-3 text-right font-semibold text-[#131722] dark:text-white tabular-nums">
                      {stock.marketCap}
                    </td>

                    <td className="py-3 px-3 text-right text-[#787B86] dark:text-[#848e9c] tabular-nums">
                      {stock.peRatio ? stock.peRatio.toFixed(1) : '—'}
                    </td>

                    <td className="py-3 px-4 text-right text-[#787B86] dark:text-[#848e9c] tabular-nums">
                      {stock.volume24h}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectStock(stock);
                          onClose();
                        }}
                        className="px-2.5 py-1 text-[11px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 rounded hover:bg-blue-100 transition-colors"
                      >
                        Chart
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
