import { container } from 'tsyringe';
import ProductsRepository from '../../modules/products/infra/typeorm/repositories/ProductsRepository';
import IProductsRepository from '../../modules/products/repositories/IProductsRepository';
import PurchasesRepository from '../../modules/purchases/infra/typeorm/repositories/PurchasesRepository';
import IPurchasesRepository from '../../modules/purchases/repositories/IPurchasesRepository';
import StoresRespository from '../../modules/stores/infra/typeorm/repositories/StoresRepository';
import IStoresRespository from '../../modules/stores/repositories/IStoresRepository';

container.registerSingleton<IStoresRespository>(
  'StoresRespository',
  StoresRespository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IPurchasesRepository>(
  'PurchasesRepository',
  PurchasesRepository,
);
