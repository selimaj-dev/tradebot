import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";

interface TradingSignalProps {
  signal: "long" | "short";
  confidence: number;
  loading: boolean;
}

export const TradingSignal = ({
  signal,
  confidence,
  loading,
}: TradingSignalProps) => {
  const isLong = signal === "long";

  return (
    <div
      className={`glass-card p-4 ${
        loading ? "glow-neutral" : isLong ? "glow-bullish" : "glow-bearish"
      } animate-fade-in`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-xl ${
              loading
                ? "bg-neutral-50/5"
                : isLong
                ? "bg-bullish/20"
                : "bg-bearish/20"
            }`}
          >
            {isLong ? (
              <TrendingUp className="w-6 h-6 text-bullish" />
            ) : loading ? (
              <Loader2 className="w-6 h-6 text-neutral-50" />
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
                loading
                  ? "text-neutral-50"
                  : isLong
                  ? "text-bullish"
                  : "text-bearish"
              }`}
            >
              {isLong ? "LONG" : loading ? "LOADING" : "SHORT"}
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
                  loading
                    ? "bg-neutral-50"
                    : isLong
                    ? "bg-bullish"
                    : "bg-bearish"
                }`}
                style={{ width: `${confidence}%` }}
              />
            </div>
            <span
              className={`font-mono font-semibold ${
                loading
                  ? "text-neutral-50"
                  : isLong
                  ? "text-bullish"
                  : "text-bearish"
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
