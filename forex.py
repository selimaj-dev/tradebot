import requests
from datetime import datetime, timedelta, timezone

end_date = datetime.now(timezone.utc).date()
start_date = end_date - timedelta(days=1)

BASE_URL = "https://api.fxratesapi.com/timeseries"

params = {
    "start_date": start_date.isoformat(),
    "end_date": end_date.isoformat(),
    "base": "AUD",
    "symbols": "CAD",
    "places": 10,
    "accuracy": "hour",
}

response = requests.get(BASE_URL, params=params)
data = response.json()

print(data)

rates = data['rates']

h = 0

print('=--------=')

for date_time, rate_info in rates.items():
    usd_rate = rate_info['CAD']
    print(f"Date and Time: {date_time}, Rate: {usd_rate}")
    h += 1
