# fly

Find cheap flights with ease.

## Getting started

Install dependencies:

```bash
yarn install
```

Run the app:

```bash
yarn start
```

Make a query:

```bash
curl "http://localhost:3000/search?origin=sao&destination=aju&date=2019-01-01"

{
    "lowestFare": 407.84,
    "sources": [
        {
            "sourceName": "Avianca",
            "lowestFare": 699
        },
        {
            "sourceName": "Azul",
            "lowestFare": 697.1
        },
        {
            "sourceName": "Gol",
            "lowestFare": 521.94
        },
        {
            "sourceName": "Latam",
            "lowestFare": 407.84
        }
    ]
}
```
