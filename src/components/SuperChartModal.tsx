import React, { useState, useMemo } from 'react';
import {
  X,
  Star,
  Maximize2,
  TrendingUp,
  TrendingDown,
  BarChart2,
  Activity,
  Layers,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import { MarketItem, ChartCandle } from '../types/market';
import { generateCandleData } from '../data/mockMarketData';

interface SuperChartModalProps {
  item: MarketItem | null;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (item: MarketItem) => void;
}

export const SuperChartModal: React.FC<SuperChartModalProps> = ({
  item,
  onClose,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  if (!item) return null;

  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '6M' | 'YTD' | '1Y' | 'ALL'>('1D');
  const [chartType, setChartType] = useState<'candle' | 'line'>('candle');
  const [showMA, setShowMA] = useState(true);
  const [showRSI, setShowRSI] = useState(false);
  const [showVolume, setShowVolume] = useState(true);
  const [hoveredCandle, setHoveredCandle] = useState<ChartCandle | null>(null);

  // Trading simulation state
  const [tradeAction, setTradeAction] = useState<'buy' | 'sell'>('buy');
  const [sharesCount, setSharesCount] = useState<number>(10);
  const [tradeSuccessMsg, setTradeSuccessMsg] = useState<string | null>(null);

  // Generate realistic candles for this symbol
  const candleCount = timeframe === '1D' ? 28 : timeframe === '5D' ? 35 : 45;
  const candleData = useMemo(() => {
    return generateCandleData(item.price, candleCount);
  }, [item.price, timeframe, candleCount]);

  const activeCandle = hoveredCandle || candleData[candleData.length - 1];
  const isPositive = item.changePercent >= 0;

  // Chart coordinate calculations
  const chartWidth = 720;
  const chartHeight = 320;
  const paddingX = 40;
  const paddingY = 30;

  const minPrice = Math.min(...candleData.map((c) => c.low)) * 0.998;
  const maxPrice = Math.max(...candleData.map((c) => c.high)) * 1.002;
  const priceRange = maxPrice - minPrice || 1;

  const maxVolume = Math.max(...candleData.map((c) => c.volume)) || 1;

  const getY = (val: number) => {
    return chartHeight - paddingY - ((val - minPrice) / priceRange) * (chartHeight - paddingY * 2);
  };

  const candleWidth = Math.max(4, Math.floor((chartWidth - paddingX * 2) / candleData.length) - 4);

  // Moving average line (20 periods)
  const maPoints = useMemo(() => {
    const period = 7;
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < candleData.length; i++) {
      const x = paddingX + (i / (candleData.length - 1)) * (chartWidth - paddingX * 2);
      if (i >= period - 1) {
        const slice = candleData.slice(i - period + 1, i + 1);
        const avg = slice.reduce((sum, c) => sum + c.close, 0) / period;
        points.push({ x, y: getY(avg) });
      }
    }
    return points;
  }, [candleData, priceRange, minPrice]);

  // Line chart path
  const linePath = useMemo(() => {
    return candleData
      .map((c, idx) => {
        const x = paddingX + (idx / (candleData.length - 1)) * (chartWidth - paddingX * 2);
        const y = getY(c.close);
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [candleData, priceRange, minPrice]);

  const handleExecuteTrade = () => {
    const total = (item.price * sharesCount).toLocaleString('en-US', {
      style: 'currency',
      currency: item.currency === 'JPY' ? 'JPY' : 'USD',
    });
    setTradeSuccessMsg(
      `Order executed! ${tradeAction.toUpperCase()} ${sharesCount} ${item.symbol} at ${item.price.toFixed(2)} (${total})`
    );
    setTimeout(() => setTradeSuccessMsg(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#131722] text-[#131722] dark:text-[#d1d4dc] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Header */}
        <div className="px-5 py-4 border-b border-[#E0E3EB] dark:border-[#2a2e39] flex items-center justify-between gap-4 bg-white dark:bg-[#1e222d]/60">
          <div className="flex items-center gap-3">
            {item.badge && (
              <span
                className={`w-7 h-7 rounded-full ${item.badgeColor || 'bg-blue-600'} text-white font-bold text-xs flex items-center justify-center shrink-0`}
              >
                {item.badge}
              </span>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-[#131722] dark:text-white">{item.symbol}</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[#787B86] dark:text-[#848e9c] font-semibold">
                  {item.exchange || 'INDEX'}
                </span>
                <span className="text-xs text-[#787B86] dark:text-[#848e9c] hidden sm:inline">
                  {item.name}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWatchlist(item)}
              title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
              className={`p-2 rounded-lg border transition-colors ${
                isWatchlisted
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-500'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400'
              }`}
            >
              <Star className={`w-4 h-4 ${isWatchlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Price Sub-bar & Timeframe bar */}
        <div className="px-5 py-3 border-b border-[#E0E3EB] dark:border-[#2a2e39] flex flex-wrap items-center justify-between gap-4 bg-[#F8F9FD] dark:bg-[#131722]">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black tabular-nums text-[#131722] dark:text-white">
              {item.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="text-xs font-semibold text-[#787B86] dark:text-[#848e9c]">
              {item.currency}
            </span>
            <span
              className={`text-sm font-bold px-2 py-0.5 rounded tabular-nums ${
                isPositive
                  ? 'bg-[#E6F4F1] dark:bg-emerald-950/60 text-[#089981]'
                  : 'bg-[#FDE8E9] dark:bg-red-950/60 text-[#F23645]'
              }`}
            >
              {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}{' '}
              ({isPositive ? `+${item.change.toFixed(2)}` : item.change.toFixed(2)})
            </span>
          </div>

          {/* Timeframe Tabs & Chart Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-200/70 dark:bg-[#1e222d] rounded-lg p-0.5 text-xs font-semibold">
              {(['1D', '5D', '1M', '6M', 'YTD', '1Y', 'ALL'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    timeframe === tf
                      ? 'bg-white dark:bg-[#2a2e39] text-blue-600 dark:text-white shadow-xs'
                      : 'text-[#787B86] dark:text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Candle vs Line Toggle */}
            <div className="flex items-center bg-gray-200/70 dark:bg-[#1e222d] rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setChartType('candle')}
                title="Candlestick Chart"
                className={`p-1.5 rounded-md transition-colors ${
                  chartType === 'candle'
                    ? 'bg-white dark:bg-[#2a2e39] text-blue-600 dark:text-white shadow-xs'
                    : 'text-[#787B86] hover:text-black dark:hover:text-white'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setChartType('line')}
                title="Line Chart"
                className={`p-1.5 rounded-md transition-colors ${
                  chartType === 'line'
                    ? 'bg-white dark:bg-[#2a2e39] text-blue-600 dark:text-white shadow-xs'
                    : 'text-[#787B86] hover:text-black dark:hover:text-white'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Technical Indicators */}
            <button
              onClick={() => setShowMA(!showMA)}
              className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-colors ${
                showMA
                  ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 border-blue-200 dark:border-blue-800'
                  : 'text-[#787B86] border-gray-200 dark:border-gray-700'
              }`}
            >
              MA (7)
            </button>
            <button
              onClick={() => setShowVolume(!showVolume)}
              className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-colors ${
                showVolume
                  ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 border-blue-200 dark:border-blue-800'
                  : 'text-[#787B86] border-gray-200 dark:border-gray-700'
              }`}
            >
              Vol
            </button>
          </div>
        </div>

        {/* Chart Viewport & Hover Data Pill */}
        <div className="relative flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
          {/* Active Candle Hover Info Bar */}
          {activeCandle && (
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#787B86] dark:text-[#848e9c] bg-[#F8F9FD] dark:bg-[#1e222d] px-3.5 py-1.5 rounded-lg border border-[#E0E3EB] dark:border-[#2a2e39] w-fit">
              <span>Time: <strong className="text-[#131722] dark:text-white">{activeCandle.time}</strong></span>
              <span>Open: <strong className="text-[#131722] dark:text-white tabular-nums">{activeCandle.open}</strong></span>
              <span>High: <strong className="text-[#089981] tabular-nums">{activeCandle.high}</strong></span>
              <span>Low: <strong className="text-[#F23645] tabular-nums">{activeCandle.low}</strong></span>
              <span>Close: <strong className="text-[#131722] dark:text-white tabular-nums">{activeCandle.close}</strong></span>
              <span>Volume: <strong className="text-[#131722] dark:text-white tabular-nums">{activeCandle.volume.toLocaleString()}</strong></span>
            </div>
          )}

          {/* SVG Canvas Area */}
          <div className="w-full bg-white dark:bg-[#131722] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl p-3 relative overflow-hidden">
            {/* Grid lines */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 opacity-30 dark:opacity-10">
              <div className="border-b border-dashed border-gray-400 w-full" />
              <div className="border-b border-dashed border-gray-400 w-full" />
              <div className="border-b border-dashed border-gray-400 w-full" />
              <div className="border-b border-dashed border-gray-400 w-full" />
            </div>

            <svg
              className="w-full h-72 sm:h-80 select-none overflow-visible"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
              onMouseLeave={() => setHoveredCandle(null)}
            >
              {/* Volume Bars */}
              {showVolume &&
                candleData.map((c, idx) => {
                  const x = paddingX + (idx / (candleData.length - 1)) * (chartWidth - paddingX * 2);
                  const isUp = c.close >= c.open;
                  const vHeight = (c.volume / maxVolume) * 50;
                  const y = chartHeight - paddingY - vHeight;
                  return (
                    <rect
                      key={`vol-${idx}`}
                      x={x - candleWidth / 2}
                      y={y}
                      width={candleWidth}
                      height={vHeight}
                      fill={isUp ? 'rgba(8, 153, 129, 0.25)' : 'rgba(242, 54, 69, 0.25)'}
                    />
                  );
                })}

              {/* Moving Average Line */}
              {showMA && maPoints.length > 1 && (
                <path
                  d={maPoints
                    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`)
                    .join(' ')}
                  fill="none"
                  stroke="#2962FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}

              {/* Line Chart Mode */}
              {chartType === 'line' && (
                <path
                  d={linePath}
                  fill="none"
                  stroke={isPositive ? '#089981' : '#F23645'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              )}

              {/* Candlestick Chart Mode */}
              {chartType === 'candle' &&
                candleData.map((c, idx) => {
                  const x = paddingX + (idx / (candleData.length - 1)) * (chartWidth - paddingX * 2);
                  const isUp = c.close >= c.open;
                  const candleColor = isUp ? '#089981' : '#F23645';

                  const yHigh = getY(c.high);
                  const yLow = getY(c.low);
                  const yOpen = getY(c.open);
                  const yClose = getY(c.close);

                  const topBody = Math.min(yOpen, yClose);
                  const bodyHeight = Math.max(2, Math.abs(yClose - yOpen));

                  return (
                    <g
                      key={`candle-${idx}`}
                      className="cursor-crosshair group"
                      onMouseEnter={() => setHoveredCandle(c)}
                    >
                      {/* Upper & Lower Wick */}
                      <line
                        x1={x}
                        y1={yHigh}
                        x2={x}
                        y2={yLow}
                        stroke={candleColor}
                        strokeWidth="1.5"
                      />
                      {/* Candle Body */}
                      <rect
                        x={x - candleWidth / 2}
                        y={topBody}
                        width={candleWidth}
                        height={bodyHeight}
                        fill={candleColor}
                        rx="1"
                      />
                    </g>
                  );
                })}

              {/* Price axis labels on the right */}
              <text
                x={chartWidth - 4}
                y={paddingY + 8}
                textAnchor="end"
                className="text-[10px] font-mono fill-gray-400"
              >
                {maxPrice.toFixed(2)}
              </text>
              <text
                x={chartWidth - 4}
                y={chartHeight - paddingY}
                textAnchor="end"
                className="text-[10px] font-mono fill-gray-400"
              >
                {minPrice.toFixed(2)}
              </text>
            </svg>
          </div>

          {/* Quick Simulated Paper Trade Widget */}
          <div className="bg-[#F8F9FD] dark:bg-[#1e222d] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-sm text-[#131722] dark:text-white">
                  TradingView Simulated Paper Trading
                </span>
              </div>
              <span className="text-xs text-[#787B86] dark:text-[#848e9c]">Demo Account Balance: $100,000.00</span>
            </div>

            {tradeSuccessMsg && (
              <div className="mb-3 p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{tradeSuccessMsg}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-lg bg-gray-200 dark:bg-gray-800 p-0.5 text-xs font-bold">
                <button
                  onClick={() => setTradeAction('buy')}
                  className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
                    tradeAction === 'buy' ? 'bg-[#089981] text-white shadow-xs' : 'text-gray-500'
                  }`}
                >
                  Buy / Long
                </button>
                <button
                  onClick={() => setTradeAction('sell')}
                  className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
                    tradeAction === 'sell' ? 'bg-[#F23645] text-white shadow-xs' : 'text-gray-500'
                  }`}
                >
                  Sell / Short
                </button>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs text-[#787B86] dark:text-[#848e9c]">Shares / Units:</label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={sharesCount}
                  onChange={(e) => setSharesCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24 px-3 py-1.5 text-xs font-bold rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#131722] text-[#131722] dark:text-white tabular-nums outline-none focus:border-blue-600"
                />
              </div>

              <div className="text-xs font-semibold text-[#787B86] dark:text-[#848e9c]">
                Est. Cost: <span className="font-bold text-[#131722] dark:text-white tabular-nums">${(item.price * sharesCount).toFixed(2)}</span>
              </div>

              <button
                onClick={handleExecuteTrade}
                className={`ml-auto px-5 py-2 text-xs font-bold text-white rounded-lg transition-all shadow-xs cursor-pointer ${
                  tradeAction === 'buy'
                    ? 'bg-[#089981] hover:bg-emerald-700'
                    : 'bg-[#F23645] hover:bg-red-700'
                }`}
              >
                Place {tradeAction === 'buy' ? 'Buy' : 'Sell'} Order
              </button>
            </div>
          </div>

          {/* Key Fundamentals & Statistics Grid */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#131722] dark:text-white">Key Statistics & Fundamentals</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-[#F8F9FD] dark:bg-[#1e222d] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl">
                <span className="text-[#787B86] dark:text-[#848e9c]">Day's Range</span>
                <div className="font-bold text-sm text-[#131722] dark:text-white mt-1 tabular-nums">
                  {item.low24h || (item.price * 0.985).toFixed(2)} - {item.high24h || (item.price * 1.015).toFixed(2)}
                </div>
              </div>
              <div className="p-3 bg-[#F8F9FD] dark:bg-[#1e222d] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl">
                <span className="text-[#787B86] dark:text-[#848e9c]">52-Week Range</span>
                <div className="font-bold text-sm text-[#131722] dark:text-white mt-1 tabular-nums">
                  {item.week52Low || (item.price * 0.72).toFixed(2)} - {item.week52High || (item.price * 1.25).toFixed(2)}
                </div>
              </div>
              <div className="p-3 bg-[#F8F9FD] dark:bg-[#1e222d] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl">
                <span className="text-[#787B86] dark:text-[#848e9c]">Market Cap / AUM</span>
                <div className="font-bold text-sm text-[#131722] dark:text-white mt-1 tabular-nums">
                  {item.marketCap || 'N/A'}
                </div>
              </div>
              <div className="p-3 bg-[#F8F9FD] dark:bg-[#1e222d] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl">
                <span className="text-[#787B86] dark:text-[#848e9c]">P/E Ratio</span>
                <div className="font-bold text-sm text-[#131722] dark:text-white mt-1 tabular-nums">
                  {item.peRatio ? item.peRatio.toFixed(1) : 'N/A'}
                </div>
              </div>
              <div className="p-3 bg-[#F8F9FD] dark:bg-[#1e222d] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl">
                <span className="text-[#787B86] dark:text-[#848e9c]">Prev. Close</span>
                <div className="font-bold text-sm text-[#131722] dark:text-white mt-1 tabular-nums">
                  {item.prevClose || item.price.toFixed(2)}
                </div>
              </div>
              <div className="p-3 bg-[#F8F9FD] dark:bg-[#1e222d] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl">
                <span className="text-[#787B86] dark:text-[#848e9c]">Open</span>
                <div className="font-bold text-sm text-[#131722] dark:text-white mt-1 tabular-nums">
                  {item.openPrice || (item.price * 0.995).toFixed(2)}
                </div>
              </div>
              <div className="p-3 bg-[#F8F9FD] dark:bg-[#1e222d] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl">
                <span className="text-[#787B86] dark:text-[#848e9c]">Volume (24h)</span>
                <div className="font-bold text-sm text-[#131722] dark:text-white mt-1 tabular-nums">
                  {item.volume24h || 'N/A'}
                </div>
              </div>
              <div className="p-3 bg-[#F8F9FD] dark:bg-[#1e222d] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl">
                <span className="text-[#787B86] dark:text-[#848e9c]">Dividend Yield</span>
                <div className="font-bold text-sm text-[#131722] dark:text-white mt-1 tabular-nums">
                  {item.dividendYield ? `${item.dividendYield.toFixed(2)}%` : '0.00%'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
