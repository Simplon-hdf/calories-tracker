import { ProductRequest } from '../interfaces/types';
import { Request, Response } from 'express';
import service from '../services/service';
import getProductByBarcode from '../services/service';

const getProduct = async (req: Request, res: Response) => {
    const barcode = req.params.barcode;
    try {
      const product = await getProductByBarcode(barcode);
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: 'Produit non trouvé' });
    }
  };

export default getProduct;