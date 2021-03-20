import { UserInputError } from 'apollo-server-errors';
import { inject, singleton } from 'tsyringe';
import IStoresRespository from '../../stores/repositories/IStoresRepository';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface ICreateProductInput {
  name: string;
  price: number;
  storeId: string;
}
@singleton()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('StoresRespository')
    private storesRespository: IStoresRespository,
  ) {}

  public async execute({
    name,
    price,
    storeId,
  }: ICreateProductInput): Promise<Product> {
    const store = await this.storesRespository.findById(storeId);
    if (!store) throw new UserInputError('Store not found!');
    return this.productsRepository.create({
      name,
      price,
      store,
    });
  }
}

export default CreateProductService;
