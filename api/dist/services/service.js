import config from '../config/config';
const getProductByBarcode = async (barcode) => {
    const url = `${config.openFoodFactsUrl}/${barcode}.json`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
        else {
            throw new Error('Product not found');
        }
    }
    catch (error) {
        throw error;
    }
};
export default getProductByBarcode;
