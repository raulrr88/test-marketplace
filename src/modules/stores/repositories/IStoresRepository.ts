import ICreateStoreDTO from '../dtos/ICreateStoreDTO';
import Store from '../infra/typeorm/entities/Store';

interface IStoresRespository {
  create(data: Omit<ICreateStoreDTO, 'id'>): Promise<Store>;
  update(data: ICreateStoreDTO): Promise<boolean>;
  save(store: Store): Promise<Store>;
  getAll(): Promise<Store[]>;
  findById(id: string): Promise<Store | undefined>;
  findByName(name: string): Promise<Store | undefined>;
}

export default IStoresRespository;
