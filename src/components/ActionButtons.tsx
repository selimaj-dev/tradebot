import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { TradeSignal } from "@/App";

interface ActionButtonsProps {
  onRefresh: () => void;
  symbol: string;
  tradeData: TradeSignal;
}

export const ActionButtons = ({
  onRefresh,
  symbol,
  tradeData,
}: ActionButtonsProps) => {
  const handleCopy = () => {
    const tradeInfo = `Symbol: ${symbol}\n${JSON.stringify(
      tradeData,
      null,
      2
    )}`;

    navigator.clipboard.writeText(tradeInfo);
    toast("Trade setup copied to clipboard!");
  };

  return (
    <div
      className="flex gap-2 animate-fade-in px-4"
      style={{ animationDelay: "0.4s" }}
    >
      <Button
        variant="outline"
        size="sm"
        className="flex-1 bg-secondary/50 border-border/50 hover:bg-secondary hover:border-primary/50 transition-all"
        onClick={handleCopy}
      >
        <Copy className="w-4 h-4 mr-2" />
        Copy Setup
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-secondary/50 border-border/50 hover:bg-secondary hover:border-primary/50 transition-all"
        onClick={onRefresh}
      >
        <RefreshCw className="w-4 h-4" />
      </Button>
      {/* <Button
        variant="outline"
        size="sm"
        className="bg-secondary/50 border-border/50 hover:bg-secondary hover:border-primary/50 transition-all"
      >
        <Settings className="w-4 h-4" />
      </Button> */}
    </div>
  );
};
