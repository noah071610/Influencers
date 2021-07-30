import { Follow } from 'src/entities/Follow';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from 'src/entities/Users';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Follow])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
