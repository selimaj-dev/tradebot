import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { GeminiApiKeyModal } from "./components/GeminiApiKeyModal";
import CryptoSelect from "./components/CryptoSelect";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { HomeIcon, XIcon } from "lucide-react";
import Result from "./components/Result";
import fetchTradeData from "./lib/fetch-signal";

export type TradeSignal = {
  price: number;
  change: number;
  changePercent: number;
  signal: "long" | "short";
  confidence: number;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  volume24h: string;
  volatility: "Low" | "Medium" | "High";
  trend: "Bull" | "Bear" | "Neutral";
  momentum: number;
  fearGreedIndex: number;
};

export default function Index() {
  const [symbol, setSymbol] = useState<string>("BTCUSDT");
  const [signals, setSignals] = useState<[string, TradeSignal][]>(
    JSON.parse(Cookies.get("saved_signals") || "[]")
  );
  const apiKey = Cookies.get("gemini_api_key");
  const [activeTab, setActiveTab] = useState<string>(
    Cookies.get("active_tab") || "home"
  );

  useEffect(() => {
    Cookies.set("active_tab", activeTab, { expires: 7 });
  }, [activeTab]);

  useEffect(() => {
    Cookies.set("saved_signals", JSON.stringify(signals), { expires: 7 });
  }, [signals]);

  return (
    <div className="w-sm h-[600px] px-2 py-4 space-y-3">
      {!apiKey && <GeminiApiKeyModal onSaved={window.location.reload} />}

      <Tabs
        defaultValue="home"
        value={activeTab}
        onValueChange={setActiveTab}
        className="h-full"
      >
        <TabsList className="w-max mx-auto">
          <TabsTrigger value="home">
            <HomeIcon />
          </TabsTrigger>
          {signals.map(([symbol, _], index) => (
            <TabsTrigger value={String(index)} key={index}>
              {symbol}{" "}
              <span
                className="ml-2 cursor-pointer hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setSignals((s) => {
                    const newSignals = s.filter((_, i) => i !== index);

                    if (activeTab === String(index)) {
                      const newIndex = index - 1;
                      setActiveTab(newIndex >= 0 ? String(newIndex) : "home");
                    } else if (parseInt(activeTab) > index) {
                      setActiveTab(String(parseInt(activeTab) - 1));
                    }

                    return newSignals;
                  });
                }}
              >
                <XIcon className="w-4 h-4" stroke="currentColor" />
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="home" className="h-full">
          <div className="w-full h-full px-10 flex items-center">
            <div className="w-full flex flex-col gap-5">
              <CryptoSelect onSelect={setSymbol}>
                <div className="w-full bg-linear-to-r from-primary/2 to-primary/10 hover:to-primary/20 transition-colors duration-700 p-3 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-10 h-10 rounded-xl"
                        src={`https://linx64.github.io/cryptoicon-api/public/icons/${symbol
                          .slice(0, 3)
                          .toLowerCase()}.png`}
                        alt=""
                      />
                      <div>
                        <p className="font-semibold text-foreground">
                          {symbol}
                        </p>
                        <p className="text-xs text-muted-foreground">Crypto</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CryptoSelect>

              <Button
                className="border border-primary/5 text-foreground bg-gradient-to-r from-primary/2 to-primary/10 hover:to-primary/20 hover:bg-gradient-to-r transition-colors duration-500"
                onClick={() => {
                  fetchTradeData(
                    symbol,
                    apiKey,
                    (data) => {
                      setActiveTab(String(signals.length));
                      setSignals((s) => [...s, [symbol, data]]);
                    },
                    () => {}
                  );
                }}
              >
                Analyze
              </Button>
            </div>
          </div>
        </TabsContent>
        {signals.map(([symbol, tradeData], index) => (
          <TabsContent value={String(index)} key={index} className="my-4">
            <Result symbol={symbol} tradeData={tradeData} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
