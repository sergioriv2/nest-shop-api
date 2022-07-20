import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

import {
  DATA_SOURCE,
  DEVELOPMENT,
  TESTING,
  PRODUCTION,
} from '../constants/constants';

import { databaseConfig } from '../constants/databaseConfig';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TESTING:
          config = databaseConfig.testing;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
      }

      const dataSource = new DataSource({
        ...config,
        synchronize: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      });
      dataSource.options;

      return dataSource.initialize();
    },
  },
];
