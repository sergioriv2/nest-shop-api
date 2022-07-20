import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity';

import {
  DATA_SOURCE as source,
  PRODUCT_REPOSITORY as repo,
} from '@constants/constants';

export const productProviders = [
  {
    provide: repo,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: [source],
  },
];
