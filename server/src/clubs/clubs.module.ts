import { Module } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ClubsController } from './clubs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubPosts } from 'src/entities/ClubPosts';
import { Groups } from 'src/entities/Groups';
import { Users } from 'src/entities/Users';
import { Images } from 'src/entities/Images';

@Module({
  imports: [TypeOrmModule.forFeature([ClubPosts, Groups, Users, Images])],
  providers: [ClubsService],
  controllers: [ClubsController],
})
export class ClubsModule {}
