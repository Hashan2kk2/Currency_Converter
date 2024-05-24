// src/Components/Converter.jsx
import {useState, useEffect} from 'react';
import "../Components/Css/Converter.css";
import "../Components/Css/Fonts.css";
import CurrencyDropDown from "../Components/CurrencyDropDown.jsx";
import {BiChevronDown, BiSun, BiMoon} from "react-icons/bi";
import {getExchangeRates} from './Services/exchangeRateService.jsx';

function Converter() {
    const [exchangeRates, setExchangeRates] = useState({});
    const [inputAmount, setInputAmount] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [targetCurrency, setTargetCurrency] = useState('USD');
    const [darkMode, setDarkMode] = useState(false);

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

    const toggleTheme = () => {
        setDarkMode(prevDarkMode => !prevDarkMode);
        console.log(!darkMode); // Log the toggled state
    };

    return (
        <div className={`h-screen w-screen flex items-center justify-center ${darkMode ? 'dark' : ''}`}>
            <button onClick={toggleTheme}
                    className="absolute top-0 right-0 p-2 dark:bg-slate-600 m-3 rounded dark:text-slate-300 bg-slate-300">
                {darkMode ? <BiMoon/> : <BiSun/>}
            </button>
            <div className="h-screen w-screen dark:bg-slate-800 bg-slate-200 flex items-center justify-center">
                <div
                    className="max-w-[375px] dark:border-slate-500 w-full h-auto p-3 border-slate-300 border rounded-md">
                    <h1 className="text-center text-2xl font-semibold dark:text-slate-300 text-slate-900">
                        Currency Converter
                    </h1>
                    <div className="flex flex-col justify-between items-center mt-4 gap-y-4">
                        <CurrencyDropDown exchangeRates={exchangeRates} setSelectedCurrency={setBaseCurrency}/>
                        <div className="flex items-center justify-between w-full">
                            <input
                                type="number"
                                placeholder="Enter Amount"
                                className="w-full p-2 border-slate-300 bg-slate-200 border rounded-md dark:bg-slate-800 dark:text-slate-300"
                                value={inputAmount}
                                onChange={e => setInputAmount(e.target.value)}
                            />
                        </div>

                        <div className="bg-gray-400 p-2 rounded-md text-gray-50">
                            <BiChevronDown/>
                        </div>

                        <CurrencyDropDown exchangeRates={exchangeRates} setSelectedCurrency={setTargetCurrency}/>
                        <div className="flex items-center justify-between w-full">
                            <input
                                type="number"
                                placeholder="Converted Amount"
                                className="w-full p-2 border-slate-300 bg-slate-200 border rounded-md dark:bg-slate-800 dark:text-slate-300"
                                value={convertedAmount}
                                readOnly
                            />
                        </div>
                        <button className="bg-slate-400 dark:bg-slate-300 w-full p-2 rounded-md"
                                onClick={handleConvert}>Convert
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Converter;

