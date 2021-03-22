const IS_PRODUCTION =
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test';

const ormconfig = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [`./src/modules/**/infra/typeorm/entities/*.ts`],
  migrations: [`./src/shared/infra/typeorm/migrations/*.ts`],
  cli: {
    migrationsDir: `./src/shared/infra/typeorm/migrations/`,
  },
};

const setupProd = () => {
  if (IS_PRODUCTION) {
    Object.assign(ormconfig, {
      ssl: true,
      extra: {
        ssl: { rejectUnauthorized: false },
      },
    });
  }
};

setupProd();
export default ormconfig;
