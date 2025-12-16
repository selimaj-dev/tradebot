import { useState } from "react";
import Cookies from "js-cookie";

type GeminiApiKeyModalProps = {
  onSaved: () => void;
};

export const GeminiApiKeyModal = ({ onSaved }: GeminiApiKeyModalProps) => {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!apiKey || apiKey.length < 20) {
      setError("Please enter a valid Gemini API key.");
      return;
    }

    Cookies.set("gemini_api_key", apiKey, {
      expires: 365,
      sameSite: "strict",
    });

    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-background w-90 rounded-xl p-6 shadow-xl space-y-4">
        <h2 className="text-lg font-semibold text-center">
          Gemini API Key Required
        </h2>

        <p className="text-sm text-muted-foreground text-center">
          To generate AI trade signals, you must provide your Gemini API key.
        </p>

        <input
          type="password"
          placeholder="Paste your Gemini API key"
          value={apiKey}
          onChange={(e) => {
            setApiKey(e.target.value);
            setError("");
          }}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-white"
          autoFocus
        />

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <button
          onClick={handleSave}
          className="w-full rounded-md bg-primary text-primary-foreground py-2 font-medium hover:opacity-90 transition"
        >
          Save API Key
        </button>

        <p className="text-xs text-muted-foreground text-center">
          Stored locally in your browser.
        </p>
      </div>
    </div>
  );
};
