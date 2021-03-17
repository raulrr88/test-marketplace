import { getRepository, Repository } from 'typeorm';
import ICreateStoreDTO from '../../../dtos/ICreateStoreDTO';
import IStoresRespository from '../../../repositories/IStoresRepository';
import Store from '../entities/Store';

class StoresRepository implements IStoresRespository {
  private ormRepository: Repository<Store>;

  constructor() {
    this.ormRepository = getRepository(Store);
  }

  public async create({
    name,
    feePercentage,
  }: Omit<ICreateStoreDTO, 'id'>): Promise<Store> {
    const newStore = this.ormRepository.create({
      name,
      feePercentage,
    });
    return this.save(newStore);
  }

  public async save(store: Store): Promise<Store> {
    return this.ormRepository.save(store);
  }

  public async findByName(name: string): Promise<Store | undefined> {
    return this.ormRepository.findOne({ where: { name } });
  }

  public async update({
    id,
    name,
    feePercentage,
  }: ICreateStoreDTO): Promise<boolean> {
    const { affected } = await this.ormRepository.update(id, {
      name,
      feePercentage,
    });
    return !!affected;
  }

  findById(id: string): Promise<Store | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async getAll(): Promise<Store[]> {
    return this.ormRepository.find();
  }
}

export default StoresRepository;
