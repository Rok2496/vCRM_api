import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('migrations')
export class Migrations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  timestamp: number;

  @Column({ type: 'varchar' })
  name: string;
} 