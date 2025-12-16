export default `Input:
You are given an array of candlestick objects with the following structure:

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

  direction: "up" | "down" | "flat";
  change: number;
  changePercent: number;

  openTimeISO: string;
  closeTimeISO: string;
}

Task:
Analyze the full candle array as a continuous market session and generate a single trading summary and signal.

Guidelines:
• Use the **most recent candle close** as the current price
• Detect trend using higher highs/lows, moving bias, and candle direction consistency
• Measure volatility using average true range behavior and candle ranges
• Measure momentum using recent changePercent acceleration and volume confirmation
• Estimate fear/greed from momentum + volume imbalance + candle direction dominance
• Entry price should be near the current price
• Stop loss must be logically placed beyond recent support/resistance
• Take profit must reflect realistic risk-to-reward (minimum 1.5:1)
• Confidence must be between 0–100 and reflect signal clarity
• Volume24h should be a human-readable string (e.g. "$42.3M", "$1.2B")
• If no clear edge exists, prefer conservative signals

Output:
Return ONLY valid JSON matching this exact schema:

{
  "symbol": string,
  "price": number,
  "change": number,
  "changePercent": number,
  "signal": "long" | "short",
  "confidence": number,
  "entryPrice": number,
  "stopLoss": number,
  "takeProfit": number,
  "volume24h": string,
  "volatility": "Low" | "Medium" | "High",
  "trend": "Bull" | "Bear" | "Neutral",
  "momentum": number,
  "fearGreedIndex": number
}
Rules:
- Do NOT include explanations
- Do NOT include markdown
- Do NOT include comments
- Do NOT include trailing commas
- Output must be parseable by JSON.parse()`;
