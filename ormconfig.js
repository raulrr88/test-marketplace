const ormconfig = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [`./dist/modules/**/infra/typeorm/entities/*.js`],
  migrations: [`./dist/shared/infra/typeorm/migrations/*.js`],
  cli: {
    migrationsDir: `./dist/shared/infra/typeorm/migrations/`,
  },
  ssl: true,
  extra: {
    ssl: { rejectUnauthorized: false },
  },
};

module.exports = ormconfig;
