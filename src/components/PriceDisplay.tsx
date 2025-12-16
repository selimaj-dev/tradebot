import { ArrowUp, ArrowDown } from "lucide-react";

interface PriceDisplayProps {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export const PriceDisplay = ({
  symbol,
  price,
  change,
  changePercent,
}: PriceDisplayProps) => {
  const isPositive = change >= 0;

  return (
    <div className="glass-card p-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary/30 to-primary/10 flex items-center justify-center">
            <span className="font-bold text-primary text-sm">
              {symbol.slice(0, 2)}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground">{symbol}</p>
            <p className="text-xs text-muted-foreground">Crypto</p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-mono text-xl font-bold text-foreground">
            ${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <div
            className={`flex items-center justify-end gap-1 ${
              isPositive ? "text-bullish" : "text-bearish"
            }`}
          >
            {isPositive ? (
              <ArrowUp className="w-3 h-3" />
            ) : (
              <ArrowDown className="w-3 h-3" />
            )}
            <span className="font-mono text-sm">
              {isPositive ? "+" : ""}
              {change.toFixed(2)} ({changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
