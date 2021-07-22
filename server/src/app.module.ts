import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { UsersModule } from './@users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './ormconfig';
import { AuthModule } from './auth/auth.module';
import { CountriesModule } from './@countries/countries.module';
import { MainPostsModule } from './@mainPosts/mainPosts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MarketModule } from './market/market.module';
import { CommentsModule } from './@comments/comments.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MorganModule,
    UsersModule,
    TypeOrmModule.forRoot(ormconfig),
    CountriesModule,
    MainPostsModule,
    MarketModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      exclude: ['/api*'],
      serveRoot: '/uploads',
    }),
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('dev'),
    },
  ],
})
export class AppModule {}
