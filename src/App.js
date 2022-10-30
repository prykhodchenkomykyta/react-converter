import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const ratesRef = React.useRef({});

  const [fromCurrency, setFromCurrency] = React.useState("UAH");
  const [toCurrency, setToCurrency] = React.useState("EUR");
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);


  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
    .then((res) =>res.json())
    .then((json) => {
      ratesRef.current = json.rates;
      onChangeToPrice(1);
    })
    .catch((err) => {
      console.warn(err);
      alert("Не вдалося отримати інформацію");
    });
  }, []);

const onChangeFromPrice = (value) => {
  const price = value / ratesRef.current[fromCurrency];
  const resultFrom = price * ratesRef.current[toCurrency];
  setFromPrice(value);
  setToPrice(resultFrom.toFixed(3));
};

const onChangeToPrice = (value) => {
  const resultTo = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
  setFromPrice(resultTo.toFixed(3));
  setToPrice(value);
};

React.useEffect(() => {
  onChangeFromPrice(fromPrice);
}, [fromCurrency]);

React.useEffect(() => {
  onChangeToPrice(toPrice);
}, [toCurrency]);

  return (
    <div className="App">
      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
