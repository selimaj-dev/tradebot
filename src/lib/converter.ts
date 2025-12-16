export type BinanceKlineRaw = [
  number, // open time (ms)
  string, // open
  string, // high
  string, // low
  string, // close
  string, // volume
  number, // close time (ms)
  string, // quote asset volume
  number, // number of trades
  string, // taker buy base volume
  string, // taker buy quote volume
  string // ignore
];

export type CandleDirection = "bullish" | "bearish" | "neutral";

export interface BinanceCandle {
  openTime: number;
  closeTime: number;

  open: number;
  high: number;
  low: number;
  close: number;

  volume: number;
  quoteVolume: number;
  trades: number;

  takerBuyVolume: number;
  takerBuyQuoteVolume: number;

  direction: CandleDirection;
  change: number;
  changePercent: number;

  openTimeISO: string;
  closeTimeISO: string;
}

export function parseBinanceKline(kline: BinanceKlineRaw): BinanceCandle {
  const [
    openTime,
    open,
    high,
    low,
    close,
    volume,
    closeTime,
    quoteVolume,
    trades,
    takerBuyVolume,
    takerBuyQuoteVolume,
  ] = kline;

  const openNum = Number(open);
  const closeNum = Number(close);

  const change = closeNum - openNum;
  const changePercent = (change / openNum) * 100;

  let direction: CandleDirection = "neutral";
  if (change > 0) direction = "bullish";
  else if (change < 0) direction = "bearish";

  return {
    openTime,
    closeTime,

    open: openNum,
    high: Number(high),
    low: Number(low),
    close: closeNum,

    volume: Number(volume),
    quoteVolume: Number(quoteVolume),
    trades,

    takerBuyVolume: Number(takerBuyVolume),
    takerBuyQuoteVolume: Number(takerBuyQuoteVolume),

    direction,
    change,
    changePercent,

    openTimeISO: new Date(openTime).toISOString(),
    closeTimeISO: new Date(closeTime).toISOString(),
  };
}

export function parseBinanceKlines(klines: BinanceKlineRaw[]): BinanceCandle[] {
  return klines.map(parseBinanceKline);
}
