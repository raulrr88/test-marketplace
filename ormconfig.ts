const ROOT_DIR = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

export = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [`./${ROOT_DIR}/modules/**/infra/typeorm/entities/*.ts`],
  migrations: [`./${ROOT_DIR}/shared/infra/typeorm/migrations/*.ts`],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations/',
  },
};
