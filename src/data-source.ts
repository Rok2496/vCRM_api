import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import * as tsconfig from 'tsconfig-paths';

config();

// Register tsconfig paths
tsconfig.register({
  baseUrl: './',
  paths: {
    'src/*': ['src/*'],
  },
});

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  synchronize: false,
  logging: true,
}); 