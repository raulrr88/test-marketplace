import ICreateStoreDTO from '../dtos/ICreateStoreDTO';
import Store from '../infra/typeorm/entities/Store';

interface IStoresRespository {
  create(data: ICreateStoreDTO): Promise<Store>;
  save(store: Store): Promise<Store>;
  findByName(name: string): Promise<Store | undefined>;
}

export default IStoresRespository;
