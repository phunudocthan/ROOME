import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './database.config';

describe('DatabaseConfig', () => {
  it('should return mongoose options when MONGO_URI is defined', () => {
    const configService = new ConfigService({
      MONGO_URI: 'mongodb://localhost:27017/roome',
    });
    const databaseConfig = new DatabaseConfig(configService);

    const options = databaseConfig.createMongooseOptions();

    expect(options).toMatchObject({
      uri: 'mongodb://localhost:27017/roome',
      retryAttempts: 3,
      retryDelay: 1000,
    });
  });

  it('should throw an error when MONGO_URI is not defined', () => {
    const configService = new ConfigService({});
    const databaseConfig = new DatabaseConfig(configService);

    expect(() => databaseConfig.createMongooseOptions()).toThrow(
      'MONGO_URI is not defined in environment variables',
    );
  });
});
