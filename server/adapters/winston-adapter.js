const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const path = require('path');
require('dotenv').config();
const logLevel = process.env.WINSTON_LOGGING_LEVEL || 'info';

/* Winston Logger Configuration */

const logFormat = printf(({ label, timestamp, level, message }) => {
  return `[${timestamp}] [${label}] (${level}): ${message}`;
});

const userFormat = printf(({ label, timestamp, level, message }) => {
  return `[${timestamp}] [${label}] (${level}): ${message}`;
});

const logger = createLogger({
  format: combine(label({ label: 'General' }), timestamp(), logFormat),
  defaultMeta: { service: 'General Logs' },
  transports: [
    new transports.Console({ handleExceptions: true }),
    new transports.File({ filename: './logs/general/server.log' }),
  ],
  rejectionHandlers: [new transports.File({ filename: './logs/exceptions/rejections.log' })],
  exitOnError: false,
});

const userLogger = createLogger({
  format: combine(label({ label: 'User-Log' }), timestamp(), userFormat),
  defaultMeta: { service: 'Mongo' },
  transports: [new transports.File({ filename: `./logs/user/userlogs.log` })],
  exitOnError: false,
});

module.exports = { logger, userLogger };
