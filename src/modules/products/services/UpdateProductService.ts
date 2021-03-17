import { UserInputError } from 'apollo-server';
import { inject, singleton } from 'tsyringe';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@singleton()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    price,
    storeId,
  }: ICreateProductDTO): Promise<Product> {
    const product = await this.productsRepository.findById(id);
    if (!product) throw new UserInputError('Product not found!');
    const affected = this.productsRepository.update({
      id,
      name,
      price,
      storeId,
    });
    const newProduct = await this.productsRepository.findById(id);
    if (affected && newProduct) return newProduct;
    throw new Error('Something went wrong, this product was not updated!');
  }
}

export default UpdateProductService;
