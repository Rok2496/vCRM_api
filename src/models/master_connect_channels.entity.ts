import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: ENTITY_NAME.MASTER_CONNECT_CHANNEL })
export class Master_Connect_Channels extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;
} 