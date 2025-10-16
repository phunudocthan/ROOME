import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

@Injectable()
export class DatabaseConfig implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const uri = this.configService.get<string>('MONGO_URI');

    if (!uri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    return {
      uri,
      retryAttempts: 3,
      retryDelay: 1000,
    };
  }
}
