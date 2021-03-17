import { inject, singleton } from 'tsyringe';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@singleton()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: Omit<ICreateProductDTO, 'id'>): Promise<Product> {
    return this.productsRepository.create(data);
  }
}

export default CreateProductService;
