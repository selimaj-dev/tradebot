import { Target, ShieldAlert, Crosshair } from "lucide-react";

interface TradeSetupProps {
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  currentPrice: number;
}

export const TradeSetup = ({
  entryPrice,
  stopLoss,
  takeProfit,
}: TradeSetupProps) => {
  const riskAmount = Math.abs(entryPrice - stopLoss);
  const rewardAmount = Math.abs(takeProfit - entryPrice);
  const riskRewardRatio = (rewardAmount / riskAmount).toFixed(2);
  const riskPercent = ((riskAmount / entryPrice) * 100).toFixed(2);
  const rewardPercent = ((rewardAmount / entryPrice) * 100).toFixed(2);

  return (
    <div className="glass-card p-4 space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Trade Setup
      </h3>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-secondary/50 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center mb-2">
            <Crosshair className="w-4 h-4 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">Entry</p>
          <p className="font-mono font-semibold text-foreground">
            ${entryPrice.toLocaleString()}
          </p>
        </div>

        <div className="bg-bearish/10 rounded-lg p-3 text-center border border-bearish/20">
          <div className="flex items-center justify-center mb-2">
            <ShieldAlert className="w-4 h-4 text-bearish" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">Stop Loss</p>
          <p className="font-mono font-semibold text-bearish">
            ${stopLoss.toLocaleString()}
          </p>
          <p className="text-xs text-bearish/70">-{riskPercent}%</p>
        </div>

        <div className="bg-bullish/10 rounded-lg p-3 text-center border border-bullish/20">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-4 h-4 text-bullish" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">Take Profit</p>
          <p className="font-mono font-semibold text-bullish">
            ${takeProfit.toLocaleString()}
          </p>
          <p className="text-xs text-bullish/70">+{rewardPercent}%</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
        <span className="text-sm text-muted-foreground">Risk/Reward Ratio</span>
        <span className="font-mono font-bold text-primary text-lg">
          1:{riskRewardRatio}
        </span>
      </div>
    </div>
  );
};
