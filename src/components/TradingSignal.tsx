import { TrendingUp, TrendingDown } from "lucide-react";

interface TradingSignalProps {
  signal: "long" | "short";
  confidence: number;
}

export const TradingSignal = ({ signal, confidence }: TradingSignalProps) => {
  const isLong = signal === "long";

  return (
    <div
      className={`glass-card p-4 ${isLong ? "glow-bullish" : "glow-bearish"} animate-fade-in`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-xl ${
              isLong ? "bg-bullish/20" : "bg-bearish/20"
            }`}
          >
            {isLong ? (
              <TrendingUp className="w-6 h-6 text-bullish" />
            ) : (
              <TrendingDown className="w-6 h-6 text-bearish" />
            )}
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Signal
            </p>
            <p
              className={`text-2xl font-bold ${
                isLong ? "text-bullish" : "text-bearish"
              }`}
            >
              {isLong ? "LONG" : "SHORT"}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Confidence
          </p>
          <div className="flex items-center gap-2">
            <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isLong ? "bg-bullish" : "bg-bearish"
                }`}
                style={{ width: `${confidence}%` }}
              />
            </div>
            <span
              className={`font-mono font-semibold ${
                isLong ? "text-bullish" : "text-bearish"
              }`}
            >
              {confidence}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
