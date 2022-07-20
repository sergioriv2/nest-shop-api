// Modules
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';

// Providers
import { UsersService } from './users.service';
import { userProviders } from './users.provider';

// Controller
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...userProviders],
  exports: [UsersService],
})
export class UsersModule {}
