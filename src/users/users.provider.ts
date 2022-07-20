import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

import {
  DATA_SOURCE as source,
  USER_REPOSITORY as repo,
} from '../constants/constants';

export const userProviders = [
  {
    provide: repo,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [source],
  },
];
