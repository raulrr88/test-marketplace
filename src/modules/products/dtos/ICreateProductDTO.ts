import Store from '../../stores/infra/typeorm/entities/Store';

export default interface ICreateProductDTO {
  id: string;
  name: string;
  price: number;
  store: Store;
}
