# 🌍 Currency Converter

![Currency Converter](https://img.shields.io/badge/Currency%20Converter-React-blue)

This is a simple currency converter application built using React. The application allows users to convert amounts between different currencies based on the latest exchange rates.

## 📚 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Services](#services)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🚀 Fetches real-time exchange rates from the Open Exchange Rates API.
- 🔄 Allows users to select base and target currencies.
- 💱 Converts the entered amount to the selected target currency.
- 🎨 Simple and responsive UI.

## 🛠️ Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Hashan2kk2/Currency_Converter.git
   cd Currency_Converter

2. Install the dependencies:

   ```sh
   npm install 

3. Create a .env file in the root directory and add your Open Exchange Rates API key:

   ```sh
   REACT_APP_API_KEY=your_api_key_here

## 🚀 Usage

1. Start the development server:

   ```sh
   npm run dev
   
2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
3. Enter the amount you want to convert and select the base and target currencies.

## 🧩 Components

- **App**: The root component that renders the CurrencyConverter component.
- **CurrencyConverter**: The main component that contains the form for converting currencies.
- **CurrencyInput**: A controlled input component for entering the amount to convert.
- **CurrencySelect**: A select component for choosing the base and target currencies.
- **CurrencyDisplay**: A component for displaying the converted amount.

`Converter.jsx`

-  This is the main component of the application. It handles the state for the input amount, converted amount, exchange rates, and selected currencies.

```// src/Components/Converter.jsx
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
```

`CurrencyDropDown.jsx`

- This component is used to render a dropdown list of currencies.

```// src/Components/CurrencyDropDown.jsx
import { useState, useEffect, useRef } from 'react';

function CurrencyDropDown({ exchangeRates, setSelectedCurrency }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const dropdownRef = useRef(null);
    const [selectedCurrency, setSelectedCurrencyState] = useState('Select the Currency');

    useEffect(() => {
        fetch("src/Components/Assets/Currencies.json")
            .then(response => response.json())
            .then(data => {
                const dataArray = Object.values(data);
                setCurrencies(dataArray);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCurrencySelect = (currencyCode) => {
        setSelectedCurrency(currencyCode); // Use setSelectedCurrency prop here
        setSelectedCurrencyState(currencyCode);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block justify-center text-center w-full" ref={dropdownRef}>
            <div>
                <button type="button" onClick={() => setIsOpen(!isOpen)}
                        className="h-[38px] text-center outline-0 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-500 sm:text-sm sm:leading-6">
                    {selectedCurrency}
                </button>
            </div>

            {isOpen && (
                <div
                    className="origin-top-right absolute left-1/2 transform -translate-x-1/2 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-[300px] z-10">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full px-2 py-1 border-0 ring-2 focus:ring-2 ring-neutral-600 ring-inset rounded-sm focus:ring-neutral-500 focus:ring-inset focus:ring-opacity-50 focus:outline-none"
                    />
                    <div className="py-1 h-[300px] overflow-y-auto" role="menu" aria-orientation="vertical"
                         aria-labelledby="options-menu">
                        {currencies.filter(currency => currency.code.toLowerCase().includes(searchTerm.toLowerCase())).map((currency, index) => {
                            return <div key={index} className="active:bg-blue-700 hover:bg-blue-800 text-center py-1"
                                        onClick={() => handleCurrencySelect(currency.code)}>{currency.code}</div>
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CurrencyDropDown;
```
## 📡 Services

- **exchangeRateService**: A service that fetches the latest exchange rates from the Open Exchange Rates API.
- **Currencies.json**: A JSON file containing a list of currency codes and names.
- **API_KEY**: An environment variable that stores the API key for the Open Exchange Rates API.
- **.env**: A file that contains environment variables for the application.

`exchangeRateService.jsx`
```angular2html
// services/exchangeRateService.js
import axios from 'axios';

const API_URL = 'https://openexchangerates.org/api/latest.json?app_id=4f776cd85d4247a2989bbe0183ed35ee';

export const getExchangeRates = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates', error);
    throw error;
  }
};
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request
6. Your changes will be merged once reviewed
7. Star the project if you like it!
8. Enjoy!

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
MIT License

Copyright (c) [2024] [Hashan2kk2]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```