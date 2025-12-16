import { Activity, BarChart3, Clock, Zap } from "lucide-react";

interface MarketStatsProps {
  volume24h: string;
  volatility: string;
  trend: string;
  momentum: number;
}

export const MarketStats = ({
  volume24h,
  volatility,
  trend,
  momentum,
}: MarketStatsProps) => {
  const stats = [
    {
      icon: BarChart3,
      label: "24h Volume",
      value: volume24h,
      color: "text-primary",
    },
    {
      icon: Activity,
      label: "Volatility",
      value: volatility,
      color: volatility === "High" ? "text-warning" : "text-muted-foreground",
    },
    {
      icon: Clock,
      label: "Trend",
      value: trend,
      color: trend === "Bullish" ? "text-bullish" : trend === "Bearish" ? "text-bearish" : "text-muted-foreground",
    },
    {
      icon: Zap,
      label: "Momentum",
      value: `${momentum}%`,
      color: momentum > 50 ? "text-bullish" : "text-bearish",
    },
  ];

  return (
    <div className="glass-card p-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Market Stats
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30"
          >
            <stat.icon className={`w-4 h-4 ${stat.color}`} />
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className={`font-mono font-semibold text-sm ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
