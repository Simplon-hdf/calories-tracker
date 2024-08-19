const fetch = require('node-fetch');
const config = require('../config/config');

const getProductByBarcode = async (barcode) => {
    const url = `${config.openFoodFactsUrl}/${barcode}.json`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Product not found');
        }
    } catch (error) {
        throw error;
    }
};

module.exports = { getProductByBarcode };