import requests
from datetime import datetime

BASE_URL = "https://api.binance.com/api/v3/klines"

params = {
    "symbol": "BTCUSDT",
    "interval": "1h",
    "limit": 10
}

response = requests.get(BASE_URL, params=params)
klines = response.json()

for candle in klines:
    open_time = datetime.fromtimestamp(candle[0] / 1000)
    open_price = float(candle[1])
    high = float(candle[2])
    low = float(candle[3])
    close = float(candle[4])
    volume = float(candle[5])

    print(
        f"{open_time} | "
        f"O: {open_price} H: {high} L: {low} C: {close} | "
        f"Vol: {volume}"
    )
