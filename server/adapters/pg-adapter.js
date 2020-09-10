/* PG Adapter */

require('dotenv').config({ path: '../.env' });
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const environmentConfig = config[environment];
const { Pool } = require('pg');
const pool = new Pool(environmentConfig.connection);
const { logger } = require('./winston-adapter');

/* Pool Logs */

pool.on('error', (err, client) => {
  if (err) {
    console.error(err);
    console.log(`-- Pool Error (idle / disconnected client)--`);
  }
});

pool.on('connect', (client) => {
  logger.debug(`* New Pool created. Total pools: ${pool.totalCount}`);
});

pool.on('acquire', (client) => {
  logger.debug(`* Client has been acquired. Total clients: ${pool.totalCount}`);
});

pool.on('remove', (client) => {
  logger.debug(`* Client closed and removed from pool. Total clients: ${pool.totalCount}`);
});

module.exports = pool;
