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
curl "http://localhost:3000/search?origin=sao&destination=aju&date=2018-12-01"

[
    {
        "sourceName": "Avianca",
        "lowestFare": 549
    },
    {
        "sourceName": "Azul",
        "lowestFare": 499.74
    },
    {
        "sourceName": "Gol",
        "lowestFare": 547.94
    },
    {
        "sourceName": "Latam",
        "lowestFare": 548.84
    }
]
```
