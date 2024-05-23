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