import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfig } from './config/database.config';
import { EnvConfig } from './config/env.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoomModule } from './modules/room/room.module';
<<<<<<< HEAD
import { AccountModule } from './modules/account/account.module';
=======

>>>>>>> a405589 (project init)
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfig],
    }),
    MongooseModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    UserModule,
    AuthModule,
    RoomModule,
<<<<<<< HEAD
    AccountModule,
=======
>>>>>>> a405589 (project init)
  ],
})
export class AppModule {}
