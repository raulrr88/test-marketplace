import { container } from 'tsyringe';
import StoresRespository from '../../modules/stores/infra/typeorm/repositories/StoresRepository';
import IStoresRespository from '../../modules/stores/repositories/IStoresRepository';

container.registerSingleton<IStoresRespository>(
  'StoresRespository',
  StoresRespository,
);
