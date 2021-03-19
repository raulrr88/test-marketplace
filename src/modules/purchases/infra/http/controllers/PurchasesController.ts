import { container } from 'tsyringe';
import Product from '../../../../products/infra/typeorm/entities/Product';
import CreatePurchaseService from '../../../services/CreatePurchaseService';
import GetPurchaseProductService from '../../../services/GetPurchaseProductService';
import GetPurchaseService from '../../../services/GetPurchaseService';
import ListPurchasesService from '../../../services/ListPurchasesService';
import ListStorePurchasesService from '../../../services/ListStorePurchasesService';
import Purchase from '../../typeorm/entities/Purchase';

interface PurchaseInput {
  purchase: {
    id: string;
    productId: string;
  };
}

class PurchasesController {
  public create({ purchase }: PurchaseInput): Promise<Purchase> {
    const createPurchase = container.resolve(CreatePurchaseService);
    return createPurchase.execute(purchase);
  }

  public get(id: string): Promise<Purchase> {
    const getPurchase = container.resolve(GetPurchaseService);
    return getPurchase.execute(id);
  }

  public getPurchaseProduct(id: string): Promise<Product> {
    const getProduct = container.resolve(GetPurchaseProductService);
    return getProduct.execute(id);
  }

  public list(): Promise<Purchase[]> {
    const listPurchases = container.resolve(ListPurchasesService);
    return listPurchases.execute();
  }

  public listStorePurchases(storeId: string): Promise<Purchase[]> {
    const listStorePurchases = container.resolve(ListStorePurchasesService);
    return listStorePurchases.execute(storeId);
  }
}

export default PurchasesController;
