// src/Components/Converter.jsx
import { useState, useEffect } from 'react';
import "../Components/Css/Converter.css";
import "../Components/Css/Fonts.css";
import CurrencyDropDown from "../Components/CurrencyDropDown.jsx";
import { BiChevronDown } from "react-icons/bi";
import { getExchangeRates } from './Services/exchangeRateService.jsx';

function Converter() {
  const [exchangeRates, setExchangeRates] = useState({});
  const [inputAmount, setInputAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('USD');

  useEffect(() => {
    console.log('Converted Amount:', convertedAmount); // Log the converted amount
  }, [convertedAmount]);

  useEffect(() => {
    getExchangeRates().then(data => {
      console.log('Exchange Rates:', data.rates); // Log the fetched exchange rates
      setExchangeRates(data.rates);
    });
  }, []);

  const handleConvert = () => {
    const baseRate = exchangeRates[baseCurrency];
    const targetRate = exchangeRates[targetCurrency];
    if (baseRate && targetRate) {
      const amount = (parseFloat(inputAmount) / parseFloat(baseRate)) * parseFloat(targetRate);
      console.log('Calculated Amount:', amount); // Log the calculated amount
      setConvertedAmount(amount);
    }
  };

  return (
      <div className="h-screen w-screen bg-slate-200 flex items-center justify-center">
        <div className="max-w-[375px] w-full h-auto p-3 border-slate-300 border rounded-md">
          <h1 className="text-center text-2xl font-semibold text-slate-900">
            Currency Converter
          </h1>
          <div className="flex flex-col justify-between items-center mt-4 gap-y-4">
            <CurrencyDropDown exchangeRates={exchangeRates} setSelectedCurrency={setBaseCurrency} />
            <div className="flex items-center justify-between w-full">
              <input
                  type="number"
                  placeholder="Enter Amount"
                  className="w-full p-2 border-slate-300 bg-slate-200 border rounded-md"
                  value={inputAmount}
                  onChange={e => setInputAmount(e.target.value)}
              />
            </div>

            <div className="bg-gray-400 p-2 rounded-md text-gray-50">
              <BiChevronDown />
            </div>

            <CurrencyDropDown exchangeRates={exchangeRates} setSelectedCurrency={setTargetCurrency} />
            <div className="flex items-center justify-between w-full">
              <input
                  type="number"
                  placeholder="Converted Amount"
                  className="w-full p-2 border-slate-300 bg-slate-200 border rounded-md"
                  value={convertedAmount}
                  readOnly
              />
            </div>
            <button className="bg-slate-600 w-full p-2 rounded-md" onClick={handleConvert}>Convert</button>
          </div>
        </div>
      </div>
  );
}

export default Converter;
