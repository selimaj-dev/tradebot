interface SentimentMeterProps {
  fearGreedIndex: number;
}

export const SentimentMeter = ({ fearGreedIndex }: SentimentMeterProps) => {
  const getSentimentLabel = (value: number) => {
    if (value <= 20) return { label: "Extreme Fear", color: "text-bearish" };
    if (value <= 40) return { label: "Fear", color: "text-warning" };
    if (value <= 60)
      return { label: "Neutral", color: "text-muted-foreground" };
    if (value <= 80) return { label: "Greed", color: "text-primary" };
    return { label: "Extreme Greed", color: "text-bullish" };
  };

  const sentiment = getSentimentLabel(fearGreedIndex);
  const rotation = (fearGreedIndex / 100) * 180 - 90;

  return (
    <div
      className="glass-card p-4 animate-fade-in"
      style={{ animationDelay: "0.3s" }}
    >
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Fear & Greed Index
      </h3>

      <div className="flex items-center justify-center">
        <div className="relative w-32 h-16 overflow-hidden">
          {/* Gauge background */}
          {/* <div className="absolute inset-0 rounded-t-full bg-linear-to-r from-(--bearish) to-(--bullish)" /> */}
          <div className="absolute inset-0 rounded-t-full bg-linear-to-r from-primary/5 to-primary/30" />

          {/* Gauge inner */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-12 bg-background rounded-t-full" />

          {/* Needle */}
          <div
            className="absolute bottom-0 left-1/2 origin-bottom w-0.5 h-12 bg-foreground transition-transform duration-700"
            style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
          />

          {/* Center dot */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-foreground rounded-full" />
        </div>
      </div>

      <div className="text-center mt-3">
        <p className={`font-bold text-lg ${sentiment.color}`}>
          {fearGreedIndex}
        </p>
        <p className={`text-sm ${sentiment.color}`}>{sentiment.label}</p>
      </div>
    </div>
  );
};
