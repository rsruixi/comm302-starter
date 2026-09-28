export type AssetCategory =
  | 'indices'
  | 'us-stocks'
  | 'world-stocks'
  | 'crypto'
  | 'futures'
  | 'forex'
  | 'bonds'
  | 'etfs'
  | 'economy';

export interface MarketItem {
  id: string;
  symbol: string;
  name: string;
  category: AssetCategory;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
  badge?: string;
  badgeColor?: string;
  subText?: string;
  marketCap?: string;
  volume24h?: string;
  sparkline: number[];
  high24h?: number;
  low24h?: number;
  openPrice?: number;
  prevClose?: number;
  peRatio?: number;
  dividendYield?: number;
  week52High?: number;
  week52Low?: number;
  sector?: string;
  exchange?: string;
  lastUpdated?: string;
}

export interface EarningsItem {
  id: string;
  symbol: string;
  companyName: string;
  estEps: string;
  timing: 'Before Open' | 'After Close' | 'During Market';
  date: string;
  actualEps?: string;
  revenueEst?: string;
}

export interface MacroEconomicEvent {
  id: string;
  country: string;
  countryCode: string;
  event: string;
  time: string;
  importance: 'high' | 'medium' | 'low';
  forecast: string;
  previous: string;
  actual?: string;
}

export interface ChartCandle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
