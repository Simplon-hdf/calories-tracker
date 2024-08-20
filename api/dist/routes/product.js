import express from 'express';
import getProduct from '../controllers/productController';
const router = express.Router();
router.get('/product/:barcode', getProduct);
export default router;
