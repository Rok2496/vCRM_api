import { ENTITY_NAME } from 'src/common/constant';
import {
  Column,
  Entity,
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: ENTITY_NAME.MASTER_BOOK_LIBRARY })
export class Master_Book_Libraries extends BaseEntity {
  @Column({ type: 'varchar', length: 256 })
  title: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  author: string;

  @Column({ nullable: true, type: 'varchar', length: 13 })
  isbn: string;

  @Column({ nullable: true, type: 'timestamp' })
  published_date: Date;

  @Column({ nullable: true, type: 'varchar', length: 128 })
  category: string;

  @Column({ nullable: true, type: 'varchar', length: 512 })
  seo_tags: string;

  @Column({ nullable: true, type: 'varchar', length: 1024 })
  file_path: string;
}
