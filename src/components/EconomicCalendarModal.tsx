import React, { useState } from 'react';
import { X, Calendar, Clock, AlertCircle } from 'lucide-react';
import { EarningsItem, MacroEconomicEvent } from '../types/market';
import { INITIAL_MACRO_EVENTS } from '../data/mockMarketData';

interface EconomicCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  earnings: EarningsItem[];
}

export const EconomicCalendarModal: React.FC<EconomicCalendarModalProps> = ({
  isOpen,
  onClose,
  earnings,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'macro' | 'earnings'>('macro');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#131722] text-[#131722] dark:text-[#d1d4dc] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0E3EB] dark:border-[#2a2e39] flex items-center justify-between bg-white dark:bg-[#1e222d]/60">
          <div>
            <h2 className="text-xl font-black text-[#131722] dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Economic & Corporate Calendar</span>
            </h2>
            <p className="text-xs text-[#787B86] dark:text-[#848e9c] mt-0.5">
              Key market-moving macroeconomic releases and upcoming quarterly corporate earnings reports.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-6 py-2.5 border-b border-[#E0E3EB] dark:border-[#2a2e39] bg-[#F8F9FD] dark:bg-[#131722] flex items-center gap-2">
          <button
            onClick={() => setActiveTab('macro')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'macro'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-[#787B86] dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Macroeconomic Releases
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'earnings'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-[#787B86] dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Corporate Earnings
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {activeTab === 'macro' ? (
            <div className="divide-y divide-gray-100 dark:divide-[#2a2e39]">
              {INITIAL_MACRO_EVENTS.map((event) => (
                <div key={event.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded font-mono text-[#131722] dark:text-white">
                      {event.countryCode}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-[#131722] dark:text-white">{event.event}</h4>
                      <div className="text-xs text-[#787B86] dark:text-[#848e9c] mt-0.5 flex items-center gap-2">
                        <span>{event.country}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {event.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-right">
                    <div>
                      <div className="text-[#787B86] dark:text-[#848e9c]">Forecast / Prev</div>
                      <div className="font-bold text-[#131722] dark:text-white tabular-nums">
                        {event.forecast} / {event.previous}
                      </div>
                    </div>

                    {event.actual && (
                      <div>
                        <div className="text-[#787B86] dark:text-[#848e9c]">Actual</div>
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                          {event.actual}
                        </div>
                      </div>
                    )}

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        event.importance === 'high'
                          ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400'
                          : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                      }`}
                    >
                      {event.importance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-[#2a2e39]">
              {earnings.map((earn) => (
                <div key={earn.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-[#131722] dark:text-white w-16">
                      {earn.symbol}
                    </span>
                    <div>
                      <h4 className="font-semibold text-sm text-[#131722] dark:text-white">
                        {earn.companyName}
                      </h4>
                      <div className="text-xs text-[#787B86] dark:text-[#848e9c] mt-0.5">
                        Scheduled: {earn.date} ({earn.timing})
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-right">
                    <div>
                      <div className="text-[#787B86] dark:text-[#848e9c]">Est. EPS</div>
                      <div className="font-bold text-[#131722] dark:text-white tabular-nums">
                        {earn.estEps}
                      </div>
                    </div>

                    {earn.revenueEst && (
                      <div>
                        <div className="text-[#787B86] dark:text-[#848e9c]">Est. Revenue</div>
                        <div className="font-bold text-[#131722] dark:text-white tabular-nums">
                          {earn.revenueEst}
                        </div>
                      </div>
                    )}

                    <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300">
                      {earn.timing}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
