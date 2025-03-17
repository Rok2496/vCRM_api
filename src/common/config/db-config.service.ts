import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

class DbConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k: string) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_NAME'),
      synchronize:
        this.getValue('SYNCHRONIZE', false) === 'true' ? true : false,
      // synchronize: true,
      logging: this.isProduction()
        ? ['error', 'warn']
        : ['query', 'error', 'warn'],
      entities: ['dist/**/*.entity.js'],
      migrationsTableName: 'migration',
      migrations: ['dist/migration/*.js'],
      ssl: this.isProduction() ? { rejectUnauthorized: false } : false,

      retryAttempts: 5,
      retryDelay: 3000,

      // Connection pooling settings
      extra: {
        max: parseInt(this.getValue('DB_MAX_POOL_SIZE', false)) || 20, // Max number of connections in pool
        min: parseInt(this.getValue('DB_MIN_POOL_SIZE', false)) || 1, // Min number of connections in pool
        idleTimeoutMillis:
          parseInt(this.getValue('DB_IDLE_TIMEOUT', false)) || 30000, // Close idle clients after 30 seconds
        connectionTimeoutMillis:
          parseInt(this.getValue('DB_CONN_TIMEOUT', false)) || 30000, // Return an error after 2 seconds if no connection is available
        keepAlive: true,
      },
    };
  }
}

const dbConfigService = new DbConfigService(process.env).ensureValues([
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
]);

export { dbConfigService };
