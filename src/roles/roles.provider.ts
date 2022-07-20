import { Role } from './entities/role.entity';
import { DataSource } from 'typeorm';

import {
  ROLE_REPOSITORY as repo,
  DATA_SOURCE as source,
} from '@constants/constants';

export const rolesProviders = [
  {
    provide: repo,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
    inject: [source],
  },
];
