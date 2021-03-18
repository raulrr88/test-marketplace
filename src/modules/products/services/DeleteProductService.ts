import { UserInputError } from 'apollo-server';
import { inject, singleton } from 'tsyringe';
import IProductsRepository from '../repositories/IProductsRepository';

@singleton()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(id: string): Promise<string> {
    const product = await this.productsRepository.findById(id);
    if (!product) throw new UserInputError('Product not found!');
    const affected = await this.productsRepository.delete(id);
    if (affected) return 'The product was successfully deleted';
    throw new Error('Something went wrong, this product was not deleted!');
  }
}

export default DeleteProductService;
