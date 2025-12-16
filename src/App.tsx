import { useEffect, useState } from "react";
import { PriceDisplay } from "@/components/PriceDisplay";
import { TradingSignal } from "@/components/TradingSignal";
import { TradeSetup } from "@/components/TradeSetup";
import { MarketStats } from "@/components/MarketStats";
import { SentimentMeter } from "@/components/SentimentMeter";
import { ActionButtons } from "@/components/ActionButtons";
import { parseBinanceKlines } from "./lib/converter";

export type TradeSignal = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  signal: "long" | "short";
  confidence: number;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  volume24h: string;
  volatility: "Low" | "Medium" | "High";
  trend: "Bull" | "Bear" | "Neutral";
  momentum: number;
  fearGreedIndex: number;
};

const Index = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [tradeData, setTradeData] = useState<TradeSignal>({
    symbol: "Loading...",
    price: NaN,
    change: NaN,
    changePercent: NaN,
    signal: "short",
    confidence: NaN,
    entryPrice: NaN,
    stopLoss: NaN,
    takeProfit: NaN,
    volume24h: "0",
    volatility: "Medium",
    trend: "Neutral",
    momentum: NaN,
    fearGreedIndex: NaN,
  });

  useEffect(() => {
    async function fetchTradeData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=10"
        );
        const data = await response.json();
        console.log(parseBinanceKlines(data));
        // setTradeData(data);
      } catch (error) {
        console.error("Error fetching trade data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTradeData();
  }, []);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div
      className="dark bg-background w-sm px-2 py-4 space-y-3"
      key={refreshKey}
    >
      {/* Price Display */}
      <PriceDisplay
        symbol={tradeData.symbol}
        price={tradeData.price}
        change={tradeData.change}
        changePercent={tradeData.changePercent}
      />

      {/* Trading Signal */}
      <TradingSignal
        signal={tradeData.signal}
        confidence={tradeData.confidence}
        loading={isLoading}
      />

      {/* Trade Setup */}
      <TradeSetup
        entryPrice={tradeData.entryPrice}
        stopLoss={tradeData.stopLoss}
        takeProfit={tradeData.takeProfit}
        currentPrice={tradeData.price}
      />

      {/* Market Stats & Sentiment */}
      <div className="grid grid-cols-2 gap-3">
        <MarketStats
          volume24h={tradeData.volume24h}
          volatility={tradeData.volatility}
          trend={tradeData.trend}
          momentum={tradeData.momentum}
        />
        <SentimentMeter fearGreedIndex={tradeData.fearGreedIndex} />
      </div>

      {/* Action Buttons */}
      <ActionButtons onRefresh={handleRefresh} />

      {/* Footer */}
      <p className="text-center text-xs text-muted-foreground pt-2">
        Not financial advice. Trade responsibly.
      </p>
    </div>
  );
};

export default Index;
