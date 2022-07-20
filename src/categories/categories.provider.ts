import { DataSource } from 'typeorm';
import { Category } from './entities/category.entity';

import {
  DATA_SOURCE as source,
  CATEGORY_REPOSITORY as repo,
} from '@constants/constants';

export const categoryProviders = [
  {
    provide: repo,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: [source],
  },
];
