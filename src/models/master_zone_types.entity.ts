import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Zones } from './zones.entity';

@Entity({ name: ENTITY_NAME.MASTER_ZONE_TYPE })
export class Master_Zone_Types extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  // External Relations
  @OneToMany(() => Zones, (x) => x.zone_type)
  zones: Zones[];
}
