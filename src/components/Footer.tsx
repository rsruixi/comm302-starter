import React from 'react';

interface FooterProps {
  onOpenScreener: () => void;
  onOpenSearch: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenScreener, onOpenSearch }) => {
  return (
    <footer className="border-t border-[#E0E3EB] dark:border-[#2a2e39] bg-white dark:bg-[#131722] text-xs text-[#787B86] dark:text-[#848e9c] mt-16 pt-12 pb-10 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-10 border-b border-[#E0E3EB] dark:border-[#2a2e39]">
          <div>
            <h4 className="font-bold text-[#131722] dark:text-white mb-3">Products</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenSearch}
                  className="hover:text-blue-600 transition-colors text-left"
                >
                  Supercharts
                </button>
              </li>
              <li>
                <a
                  href="#pine-script"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Pine Script™ is TradingView\'s proprietary scripting language for technical analysis.');
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  Pine Script™
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenScreener}
                  className="hover:text-blue-600 transition-colors text-left"
                >
                  Stock Screener
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenScreener}
                  className="hover:text-blue-600 transition-colors text-left"
                >
                  ETF Screener
                </button>
              </li>
              <li>
                <a
                  href="#forex"
                  className="hover:text-blue-600 transition-colors"
                >
                  Forex Screener
                </a>
              </li>
              <li>
                <a
                  href="#crypto"
                  className="hover:text-blue-600 transition-colors"
                >
                  Crypto Screener
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#131722] dark:text-white mb-3">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-blue-600 transition-colors">
                  About us
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-blue-600 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-blue-600 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-blue-600 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-blue-600 transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#131722] dark:text-white mb-3">Community</h4>
            <ul className="space-y-2">
              <li>
                <a href="#refer" className="hover:text-blue-600 transition-colors">
                  Refer a friend
                </a>
              </li>
              <li>
                <a href="#ideas" className="hover:text-blue-600 transition-colors">
                  Ideas
                </a>
              </li>
              <li>
                <a href="#scripts" className="hover:text-blue-600 transition-colors">
                  Scripts
                </a>
              </li>
              <li>
                <a href="#rules" className="hover:text-blue-600 transition-colors">
                  House Rules
                </a>
              </li>
              <li>
                <a href="#moderators" className="hover:text-blue-600 transition-colors">
                  Moderators
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#131722] dark:text-white mb-3">For Business</h4>
            <ul className="space-y-2">
              <li>
                <a href="#widgets" className="hover:text-blue-600 transition-colors">
                  Widgets
                </a>
              </li>
              <li>
                <a href="#advertising" className="hover:text-blue-600 transition-colors">
                  Advertising
                </a>
              </li>
              <li>
                <a href="#brokerage" className="hover:text-blue-600 transition-colors">
                  Brokerage integration
                </a>
              </li>
              <li>
                <a href="#partner" className="hover:text-blue-600 transition-colors">
                  Partner program
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2">
            <h4 className="font-bold text-[#131722] dark:text-white mb-3">Look first / Then leap.</h4>
            <p className="leading-relaxed mb-4">
              Market data provided by ICE Data Services. Select quotes delayed up to 15 minutes. Financial and trading operations carry risk. Always conduct your own research.
            </p>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[#131722] dark:text-white">Download mobile apps:</span>
              <button
                onClick={() => alert('TradingView Mobile App for iOS available on the App Store.')}
                className="px-2.5 py-1 bg-[#F0F3FA] dark:bg-[#1e222d] rounded border border-[#E0E3EB] dark:border-[#2a2e39] text-[#131722] dark:text-white font-semibold hover:border-gray-400 transition-colors"
              >
                iOS
              </button>
              <button
                onClick={() => alert('TradingView Mobile App for Android available on Google Play.')}
                className="px-2.5 py-1 bg-[#F0F3FA] dark:bg-[#1e222d] rounded border border-[#E0E3EB] dark:border-[#2a2e39] text-[#131722] dark:text-white font-semibold hover:border-gray-400 transition-colors"
              >
                Android
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[11px]">
          <div>© 2025 TradingView, Inc. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:underline">
              Terms of Use
            </a>
            <a href="#disclaimer" className="hover:underline">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
