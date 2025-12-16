import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import exchangeInfo from "@/lib/pairs.json";

interface CryptoSelectProps {
  children?: React.ReactNode;
  onSelect?: (symbol: string) => void;
}

export default function CryptoSelect({
  children,
  onSelect,
}: CryptoSelectProps) {
  const [search, setSearch] = useState("");

  const filteredSymbols = exchangeInfo.filter((symbol) =>
    symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>{children}</div>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <Input
          placeholder="Search crypto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-2"
        />

        <div className="max-h-60 overflow-y-auto">
          {filteredSymbols.map((symbol) => (
            <div key={symbol} className="mb-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  onSelect?.(symbol);
                  console.log(`Selected symbol: ${symbol}`);
                }}
              >
                {symbol}
              </Button>
            </div>
          ))}

          {filteredSymbols.length === 0 && (
            <div className="text-center text-sm text-muted-foreground py-2">
              No symbols found.
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
