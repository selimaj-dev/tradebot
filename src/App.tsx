export default function App() {
  // Example trade data
  const trade = {
    type: "Long", // or "Short"
    entry: 100,
    tp: 110,
    sl: 95,
  };

  return (
    <div className="bg-slate-900 p-6 w-80 shadow-lg">
      {/* Trade Type */}
      <div
        className={`text-white font-bold text-center py-2 px-4 rounded-xl mb-4 ${
          trade.type === "Long" ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {trade.type}
      </div>

      {/* Entry, TP, SL */}
      <div className="flex flex-col gap-3 text-gray-200">
        <div className="flex justify-between">
          <span className="font-semibold">Entry:</span>
          <span>{trade.entry}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">TP:</span>
          <span className="text-green-400 font-bold">{trade.tp}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">SL:</span>
          <span className="text-red-400 font-bold">{trade.sl}</span>
        </div>
      </div>

      {/* Optional Buttons */}
      <div className="mt-6 flex justify-between">
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
          Copy
        </button>
        <button className="bg-gray-700 text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-600 transition">
          Close
        </button>
      </div>
    </div>
  );
}
