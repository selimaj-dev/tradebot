import { PriceDisplay } from "@/components/PriceDisplay";
import { TradingSignal } from "@/components/TradingSignal";
import { TradeSetup } from "@/components/TradeSetup";
import { MarketStats } from "@/components/MarketStats";
import { SentimentMeter } from "@/components/SentimentMeter";
import { ActionButtons } from "@/components/ActionButtons";
import type { TradeSignal } from "@/App";

export default function Result({
  symbol,
  tradeData,
}: {
  symbol: string;
  tradeData: TradeSignal;
}) {
  const isLoading = false;

  return (
    <>
      <PriceDisplay
        symbol={symbol}
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
      <ActionButtons
        onRefresh={() => {}}
        symbol={symbol}
        tradeData={tradeData}
      />
    </>
  );
}
