import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ActionButtonsProps {
  onRefresh: () => void;
}

export const ActionButtons = ({ onRefresh }: ActionButtonsProps) => {
  const handleCopy = () => {
    const tradeInfo = `
Trading Signal: LONG
Entry: $67,245
Stop Loss: $65,500
Take Profit: $72,000
R:R: 1:2.72
    `.trim();

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
