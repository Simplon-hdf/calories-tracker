import getProductByBarcode from '../services/service';
const getProduct = async (req, res) => {
    const barcode = req.params.barcode;
    try {
        const product = await getProductByBarcode(barcode);
        res.json(product);
    }
    catch (error) {
        res.status(404).json({ error: 'Produit non trouvé' });
    }
};
export default getProduct;
