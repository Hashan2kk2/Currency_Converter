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
