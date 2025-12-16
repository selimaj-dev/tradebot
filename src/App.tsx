import { useState } from "react";
import { PriceDisplay } from "@/components/PriceDisplay";
import { TradingSignal } from "@/components/TradingSignal";
import { TradeSetup } from "@/components/TradeSetup";
import { MarketStats } from "@/components/MarketStats";
import { SentimentMeter } from "@/components/SentimentMeter";
import { ActionButtons } from "@/components/ActionButtons";

const Index = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  // Mock data - in a real app, this would come from an API
  const tradeData = {
    symbol: "BTC/USDT",
    price: 67245.32,
    change: 1234.56,
    changePercent: 1.87,
    signal: "long" as const,
    confidence: 78,
    entryPrice: 67245,
    stopLoss: 65500,
    takeProfit: 72000,
    volume24h: "$42.3B",
    volatility: "Medium",
    trend: "Bullish",
    momentum: 68,
    fearGreedIndex: 72,
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="dark bg-background w-sm px-2 py-4 space-y-3" key={refreshKey}>
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
