import { EnvConfig } from './env.config';

describe('EnvConfig', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
  });

  it('should map environment variables to configuration object', () => {
    process.env.PORT = '3001';
    process.env.MONGO_URI = 'mongodb://localhost:27017/roome';
    process.env.JWT_SECRET = 'test-secret';
    process.env.JWT_EXPIRES_IN = '1h';
    process.env.NODE_ENV = 'production';

    const config = EnvConfig();

    expect(config).toEqual({
      port: 3001,
      mongoUri: 'mongodb://localhost:27017/roome',
      jwtSecret: 'test-secret',
      jwtExpiresIn: '1h',
      nodeEnv: 'production',
    });
  });

  it('should fall back to defaults when optional values are missing', () => {
    delete process.env.PORT;
    delete process.env.MONGO_URI;
    delete process.env.JWT_SECRET;
    delete process.env.JWT_EXPIRES_IN;
    delete process.env.NODE_ENV;

    const config = EnvConfig();

    expect(config).toEqual({
      port: 8080,
      mongoUri: undefined,
      jwtSecret: 'default_secret_change_in_production',
      jwtExpiresIn: '7d',
      nodeEnv: 'development',
    });
  });
});
