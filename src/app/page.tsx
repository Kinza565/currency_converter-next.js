import Image from "next/image";

"use client";

import { useState, useEffect } from "react";

interface Rates {
  [key: string]: number;
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [conversionRate, setConversionRate] = useState<number | null>(null);
  const [currencies, setCurrencies] = useState<string[]>([]);

  // Fetch exchange rates
  useEffect(() => {
    const fetchCurrencies = async () => {
      const response = await fetch(
        `https://open.er-api.com/v6/latest/${fromCurrency}`
      );
      const data = await response.json();
      setCurrencies(Object.keys(data.rates));
      if (data.rates[toCurrency]) {
        setConversionRate(data.rates[toCurrency]);
      }
    };
    fetchCurrencies();
  }, [fromCurrency, toCurrency]);

  const handleConvert = (): number => {
    return conversionRate ? amount * conversionRate : 0;
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <div className="converter">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="input"
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="dropdown"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span>to</span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="dropdown"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <p className="result">Converted Amount: {handleConvert().toFixed(2)}</p>
      </div>
    </div>
  );
}
