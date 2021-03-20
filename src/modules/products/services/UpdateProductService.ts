import { UserInputError } from 'apollo-server';
import { inject, singleton } from 'tsyringe';
import IStoresRespository from '../../stores/repositories/IStoresRepository';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface ICreateProductInput {
  id: string;
  name: string;
  price: number;
  storeId: string;
}

@singleton()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('StoresRespository')
    private storesRespository: IStoresRespository,
  ) {}

  public async execute({
    id,
    name,
    price,
    storeId,
  }: ICreateProductInput): Promise<Product> {
    const product = await this.productsRepository.findById(id);
    if (!product) throw new UserInputError('Product not found!');
    const store = await this.storesRespository.findById(storeId);
    if (!store) throw new UserInputError('Store not found!');
    const affected = this.productsRepository.update({
      id,
      name,
      price,
      store,
    });
    const newProduct = await this.productsRepository.findById(id);
    if (affected && newProduct) return newProduct;
    throw new Error('Something went wrong, this product was not updated!');
  }
}

export default UpdateProductService;
