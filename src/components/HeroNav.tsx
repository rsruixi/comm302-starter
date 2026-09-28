import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { AssetCategory } from '../types/market';

interface HeroNavProps {
  activeCategory: AssetCategory;
  onSelectCategory: (category: AssetCategory) => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

export const HeroNav: React.FC<HeroNavProps> = ({
  activeCategory,
  onSelectCategory,
  selectedRegion,
  onSelectRegion,
}) => {
  const [isRegionMenuOpen, setIsRegionMenuOpen] = useState(false);

  const regions = [
    { id: 'everywhere', label: 'Markets, everywhere' },
    { id: 'us', label: 'United States Markets' },
    { id: 'europe', label: 'European Markets' },
    { id: 'asia', label: 'Asia-Pacific Markets' },
    { id: 'emerging', label: 'Emerging Markets' },
  ];

  const categories: { id: AssetCategory; label: string; targetId: string }[] = [
    { id: 'indices', label: 'Indices', targetId: 'indices' },
    { id: 'us-stocks', label: 'US stocks', targetId: 'us-stocks' },
    { id: 'world-stocks', label: 'World stocks', targetId: 'world-stocks' },
    { id: 'crypto', label: 'Crypto', targetId: 'crypto' },
    { id: 'futures', label: 'Futures & commodities', targetId: 'futures' },
    { id: 'forex', label: 'Forex & currencies', targetId: 'forex' },
    { id: 'bonds', label: 'Bonds', targetId: 'bonds' },
    { id: 'etfs', label: 'ETFs', targetId: 'etfs' },
    { id: 'economy', label: 'Economy', targetId: 'economy' },
  ];

  const handlePillClick = (cat: { id: AssetCategory; targetId: string }) => {
    onSelectCategory(cat.id);
    const element = document.getElementById(cat.targetId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const currentRegionLabel =
    regions.find((r) => r.id === selectedRegion)?.label || 'Markets, everywhere';

  return (
    <section className="border-b border-[#E0E3EB] dark:border-[#2a2e39] bg-white dark:bg-[#131722] pt-8 md:pt-10 pb-4 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        {/* Page Title with Dropdown Indicator */}
        <div className="relative mb-6 sm:mb-8">
          <div
            onClick={() => setIsRegionMenuOpen(!isRegionMenuOpen)}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group w-fit select-none"
            role="button"
            tabIndex={0}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#131722] dark:text-white group-hover:text-blue-600 transition-colors">
              {currentRegionLabel}
            </h1>
            <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-[#131722] dark:text-white group-hover:text-blue-600 transition-colors mt-1 stroke-[3]" />
          </div>

          {isRegionMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-[#1e222d] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl py-2 z-50">
              <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Select Region Focus
              </div>
              {regions.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => {
                    onSelectRegion(reg.id);
                    setIsRegionMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm font-semibold flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 text-[#131722] dark:text-gray-200 transition-colors"
                >
                  <span>{reg.label}</span>
                  {selectedRegion === reg.id && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Category Navigation Pill Links */}
        <nav className="flex items-center gap-2 overflow-x-auto pb-3 custom-scrollbar text-sm font-semibold">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handlePillClick(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#131722] dark:bg-white text-white dark:text-[#131722] shadow-sm font-bold'
                    : 'bg-[#F0F3FA] dark:bg-[#1e222d] text-[#131722] dark:text-[#d1d4dc] hover:bg-gray-200 dark:hover:bg-[#2a2e39]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>
      </div>
    </section>
  );
};
