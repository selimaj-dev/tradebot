export default `Input:
Array of candles:

{
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
  direction: "up"|"down"|"flat";
  change: number;
  changePercent: number;
  openTimeISO: string;
  closeTimeISO: string;
}

Task:
Analyze session, generate a single trading signal.

Rules:
- Trend: higher highs/lows + direction consistency
- Volatility: ATR + candle ranges
- Momentum: changePercent acceleration + volume
- Fear/Greed: momentum + volume imbalance + direction dominance
- Entry: near current price
- Stop: beyond recent support/resistance
- TakeProfit: realistic R:R ≥1.5
- Confidence: 0-100
- Volume24h: human-readable
- If unclear, signal conservative

Output ONLY valid JSON:

{
  "symbol": string,
  "price": number,
  "change": number,
  "changePercent": number,
  "signal": "long"|"short",
  "confidence": number,
  "entryPrice": number,
  "stopLoss": number,
  "takeProfit": number,
  "volume24h": string,
  "volatility": "Low"|"Medium"|"High",
  "trend": "Bull"|"Bear"|"Neutral",
  "momentum": number,
  "fearGreedIndex": number
}

- No explanations, markdown, comments, or trailing commas
- Must be parseable by JSON.parse()`;
