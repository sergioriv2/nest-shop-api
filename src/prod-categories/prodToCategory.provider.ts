import { DataSource } from 'typeorm';
import { ProdToCategory } from './entities/prod-category.entity';

import {
  PROD_CAT_REPOSITORY as repo,
  DATA_SOURCE as source,
} from '@constants/constants';

export const prodToCategoryProviders = [
  {
    provide: repo,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProdToCategory),
    inject: [source],
  },
];
