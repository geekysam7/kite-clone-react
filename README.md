# Kite Clone React

Current implementation of Kite - zerodha's trading platform is done using Vue.js. To check the info you can install Vue.js devtools on your browser and verify.

React is a library but Vue is framework and might be a reason for zerodha to go with Vue for implementing Kite. But since both are component based I have tried implementing Kite using React.

## Steps taken

- Navigate Kite and identify components.
- Go through Kite's source code to identify how they are writing CSS. Take out the color coding and font styles from it. Decided to go with Sass and BEM methodology as they both complement each other well and it's easier to maintain.
- Draw out these components on the UI, just static.
- Implement Dashboard page first without any external library like react-redux, react-router etc.

## Features

- Render Nifty index stocks using nse's api and scrapping data from it. Currently data is mocked in [mock](./public/mock/indexStocks.json).
- List out the stocks and provide an option to buy/sell. And list bought stocks inside portfolio. Also contains pending transactions and completed transactions tables.

## Components

### Table

Table component excepts following props:

- `Row` component. Row component excepts the row object and renders it. It's available so you can provide different styles along with it.
- `headers`: It should contain all the headers in the format `{label: "Header Label", value: "headerRowMapping"}`.
