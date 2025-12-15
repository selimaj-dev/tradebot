import requests

symbol = "BTCUSDT"
url = "https://api.binance.com/api/v3/ticker/price"

r = requests.get(url, params={"symbol": symbol})
data = r.json()

print(f"{symbol} price: {data['price']}")
