export interface ProductRequest extends Request {
    params: {
      barcode: string;
    };
  }