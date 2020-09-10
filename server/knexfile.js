require('dotenv').config();
module.exports = {
  production: {
    client: 'pg',
    connection: {
      host: process.env.DATADB_HOST,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
  },
  development: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
      password: process.env.PG_PASS,
    },
  },
  test: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST,
      database: process.env.TEST_PG_DATABASE,
      user: process.env.PG_USER,
      password: process.env.PG_PASS,
    },
  },
  basic: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    },
  },
  stringConfig: {
    connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  },
};
