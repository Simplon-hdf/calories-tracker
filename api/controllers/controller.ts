const service = require('../services/service');

const getProduct = async (req, res) => {
    const barcode = req.params.barcode;
    try {
        const product = await service.getProductByBarcode(barcode);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: 'Product not found' });
    }
};

module.exports = { getProduct };