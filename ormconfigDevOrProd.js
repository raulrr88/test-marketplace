"use strict";
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const ROOT_DIR = IS_PRODUCTION ? 'dist' : 'src';
const EXTENSION = IS_PRODUCTION ? 'js' : 'ts';
const ormconfig = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [`./${ROOT_DIR}/modules/**/infra/typeorm/entities/*.${EXTENSION}`],
    migrations: [`./${ROOT_DIR}/shared/infra/typeorm/migrations/*.${EXTENSION}`],
    cli: {
        migrationsDir: `./${ROOT_DIR}/shared/infra/typeorm/migrations/`,
    },
};
const prodSetup = () => {
    if (IS_PRODUCTION) {
        Object.assign(ormconfig, {
            ssl: true,
            extra: {
                ssl: { rejectUnauthorized: false },
            },
        });
    }
};
prodSetup();
module.exports = ormconfig;
