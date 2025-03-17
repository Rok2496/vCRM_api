import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: ENTITY_NAME.MASTER_PHOTO_LIBRARY })
export class Master_Photo_Library extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 128 })
  size: string;

  @Column({ nullable: true, type: 'varchar', length: 128 })
  file_extension: string;

  @Column({ nullable: true, type: 'varchar', length: 128 })
  dimension: string;

  @Column({ nullable: true, type: 'varchar', length: 256 })
  seo_tag: string;

  @Column({ type: 'varchar', nullable: true })
  attachment: string;
}
