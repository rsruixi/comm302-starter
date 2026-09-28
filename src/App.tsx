/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  INITIAL_INDICES,
  INITIAL_US_STOCKS,
  INITIAL_CRYPTO,
  INITIAL_FOREX,
  INITIAL_COMMODITIES,
  INITIAL_EARNINGS,
} from './data/mockMarketData';
import { MarketItem, AssetCategory } from './types/market';
import { Header } from './components/Header';
import { HeroNav } from './components/HeroNav';
import { IndicesSection } from './components/IndicesSection';
import { UsStocksSection } from './components/UsStocksSection';
import { CryptoSection } from './components/CryptoSection';
import { ForexCommoditiesSection } from './components/ForexCommoditiesSection';
import { WorldStocksSection } from './components/WorldStocksSection';
import { BondsEtfsSection } from './components/BondsEtfsSection';
import { SuperChartModal } from './components/SuperChartModal';
import { StockScreenerModal } from './components/StockScreenerModal';
import { CryptoHeatmapModal } from './components/CryptoHeatmapModal';
import { SearchModal } from './components/SearchModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { EconomicCalendarModal } from './components/EconomicCalendarModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

export default function App() {
  const [indices, setIndices] = useState<MarketItem[]>(INITIAL_INDICES);
  const [stocks, setStocks] = useState<MarketItem[]>(INITIAL_US_STOCKS);
  const [crypto, setCrypto] = useState<MarketItem[]>(INITIAL_CRYPTO);
  const [forex, setForex] = useState<MarketItem[]>(INITIAL_FOREX);
  const [commodities, setCommodities] = useState<MarketItem[]>(INITIAL_COMMODITIES);

  const [activeCategory, setActiveCategory] = useState<AssetCategory>('indices');
  const [selectedRegion, setSelectedRegion] = useState<string>('everywhere');
  const [isLive, setIsLive] = useState<boolean>(true);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [flashingIds, setFlashingIds] = useState<Record<string, 'up' | 'down'>>({});

  // Modals
  const [selectedItemForChart, setSelectedItemForChart] = useState<MarketItem | null>(null);
  const [isScreenerOpen, setIsScreenerOpen] = useState(false);
  const [isHeatmapOpen, setIsHeatmapOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Watchlist state
  const [watchlistIds, setWatchlistIds] = useState<string[]>(['spx', 'nvda', 'btc']);

  // Handle dark mode class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Real-time live quotes simulation engine
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Pick 1-2 random asset pools to tick
      const pools = ['indices', 'stocks', 'crypto', 'forex', 'commodities'];
      const targetPool = pools[Math.floor(Math.random() * pools.length)];

      const updateList = (list: MarketItem[], setter: React.Dispatch<React.SetStateAction<MarketItem[]>>) => {
        if (list.length === 0) return;
        const targetIndex = Math.floor(Math.random() * list.length);
        const item = list[targetIndex];
        const deltaPct = (Math.random() - 0.49) * 0.25; // -0.12% to +0.13%
        const deltaPrice = (item.price * deltaPct) / 100;
        const newPrice = Math.max(0.001, item.price + deltaPrice);
        const newChange = item.change + deltaPrice;
        const newPct = item.changePercent + deltaPct;
        const direction = deltaPct >= 0 ? 'up' : 'down';

        setter((prev) =>
          prev.map((it, idx) =>
            idx === targetIndex
              ? {
                  ...it,
                  price: newPrice,
                  change: newChange,
                  changePercent: newPct,
                }
              : it
          )
        );

        setFlashingIds((prev) => ({ ...prev, [item.id]: direction }));
        setTimeout(() => {
          setFlashingIds((prev) => {
            const next = { ...prev };
            delete next[item.id];
            return next;
          });
        }, 1200);
      };

      if (targetPool === 'indices') updateList(indices, setIndices);
      else if (targetPool === 'stocks') updateList(stocks, setStocks);
      else if (targetPool === 'crypto') updateList(crypto, setCrypto);
      else if (targetPool === 'forex') updateList(forex, setForex);
      else if (targetPool === 'commodities') updateList(commodities, setCommodities);
    }, 2800);

    return () => clearInterval(interval);
  }, [isLive, indices, stocks, crypto, forex, commodities]);

  // Combine all items for Search and Watchlist
  const allItems = useMemo(() => {
    return [...indices, ...stocks, ...crypto, ...forex, ...commodities];
  }, [indices, stocks, crypto, forex, commodities]);

  const watchlistItems = useMemo(() => {
    return allItems.filter((it) => watchlistIds.includes(it.id));
  }, [allItems, watchlistIds]);

  const toggleWatchlist = useCallback((item: MarketItem) => {
    setWatchlistIds((prev) =>
      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
    );
  }, []);

  return (
    <div className="bg-white dark:bg-[#131722] text-[#131722] dark:text-[#d1d4dc] flex flex-col min-h-screen antialiased selection:bg-blue-100 dark:selection:bg-blue-900 transition-colors">
      {/* Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        watchlistCount={watchlistIds.length}
        isLive={isLive}
        onToggleLive={() => setIsLive(!isLive)}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Hero Section with Dropdown & Navigation Pills */}
      <HeroNav
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
      />

      {/* Main Content Sections */}
      <main className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 space-y-14 flex-grow w-full">
        {/* SECTION 1: INDICES */}
        <IndicesSection
          indices={indices}
          onSelectIndex={setSelectedItemForChart}
          flashingIds={flashingIds}
        />

        {/* SECTION 2: US STOCKS */}
        <UsStocksSection
          stocks={stocks}
          earnings={INITIAL_EARNINGS}
          onSelectStock={setSelectedItemForChart}
          onOpenScreener={() => setIsScreenerOpen(true)}
          onOpenCalendar={() => setIsCalendarOpen(true)}
          flashingIds={flashingIds}
        />

        {/* SECTION 3: CRYPTO */}
        <CryptoSection
          cryptoItems={crypto}
          onSelectCrypto={setSelectedItemForChart}
          onOpenHeatmap={() => setIsHeatmapOpen(true)}
          watchlistIds={watchlistIds}
          onToggleWatchlist={toggleWatchlist}
          flashingIds={flashingIds}
        />

        {/* SECTION 4: FOREX & COMMODITIES */}
        <ForexCommoditiesSection
          forexItems={forex}
          commodityItems={commodities}
          onSelectItem={setSelectedItemForChart}
          flashingIds={flashingIds}
        />

        {/* SECTION 5: WORLD STOCKS */}
        <WorldStocksSection
          onSelectItem={setSelectedItemForChart}
          flashingIds={flashingIds}
        />

        {/* SECTION 6: BONDS, ETFS & ECONOMY */}
        <BondsEtfsSection
          onSelectItem={setSelectedItemForChart}
          flashingIds={flashingIds}
        />
      </main>

      {/* Main Footer */}
      <Footer
        onOpenScreener={() => setIsScreenerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* MODALS */}
      {/* Superchart Modal */}
      <SuperChartModal
        item={selectedItemForChart}
        onClose={() => setSelectedItemForChart(null)}
        isWatchlisted={selectedItemForChart ? watchlistIds.includes(selectedItemForChart.id) : false}
        onToggleWatchlist={toggleWatchlist}
      />

      {/* Stock Screener Modal */}
      <StockScreenerModal
        isOpen={isScreenerOpen}
        onClose={() => setIsScreenerOpen(false)}
        stocks={stocks}
        onSelectStock={setSelectedItemForChart}
      />

      {/* Crypto Heatmap Modal */}
      <CryptoHeatmapModal
        isOpen={isHeatmapOpen}
        onClose={() => setIsHeatmapOpen(false)}
        cryptoItems={crypto}
        onSelectCrypto={setSelectedItemForChart}
      />

      {/* Ctrl+K Symbol Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        allItems={allItems}
        onSelectItem={setSelectedItemForChart}
      />

      {/* Watchlist Slide-over Drawer */}
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlistItems={watchlistItems}
        onSelectItem={setSelectedItemForChart}
        onRemoveItem={toggleWatchlist}
      />

      {/* Macro & Earnings Calendar Modal */}
      <EconomicCalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        earnings={INITIAL_EARNINGS}
      />

      {/* Auth / Get Started Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}
