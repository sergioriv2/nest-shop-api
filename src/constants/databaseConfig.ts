import { DatabaseType } from 'typeorm';

interface Configuration {
  type: DatabaseType;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface DatabaseConfig {
  development: Configuration;
  testing: Configuration;
  production: Configuration;
}

export const databaseConfig: DatabaseConfig = {
  development: {
    type: 'mysql',
    host: process.env.DB_HOST_DEV,
    port: parseInt(process.env.DB_PORT_DEV),
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PASS_DEV,
    database: process.env.DB_NAME_DEV,
  },
  testing: {
    type: 'mysql',
    host: process.env.DB_HOST_TEST,
    port: parseInt(process.env.DB_PORT_TEST),
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASS_TEST,
    database: process.env.DB_NAME_TEST,
  },
  production: {
    type: 'mysql',
    host: process.env.DB_HOST_PRODUCTION,
    port: parseInt(process.env.DB_PORT_PRODUCTION),
    username: process.env.DB_USER_PRODUCTION,
    password: process.env.DB_PASS_PRODUCTION,
    database: process.env.DB_NAME_PRODUCTION,
  },
};
