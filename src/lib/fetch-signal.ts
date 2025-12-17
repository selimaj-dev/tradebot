import { parseBinanceKlines } from "@/lib/converter";
import { GoogleGenAI } from "@google/genai";
import prompt from "@/lib/prompt";
import type { TradeSignal } from "@/App";

export default async function fetchTradeData(
  symbol: string,
  apiKey: string | undefined,
  setTradeData: (data: TradeSignal) => void,
  setIsLoading: (data: boolean) => void
) {
  console.log("API Key:", apiKey);
  const ai = new GoogleGenAI({ apiKey });
  console.log("Google GenAI initialized:", ai);
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=10`
    );
    const data = await response.json();
    const candles = parseBinanceKlines(data);
    console.log("Candles:", candles);
    const ai_response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `${prompt}\n\nInput:${JSON.stringify(candles)}`,
    });
    console.log("AI Response:", ai_response);
    if (!ai_response.text) {
      return;
    }
    setTradeData(
      JSON.parse(
        ai_response.text.replace(/^```json\s*/, "").replace(/```$/, "")
      )
    );
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching trade data:", error);
  }
}
