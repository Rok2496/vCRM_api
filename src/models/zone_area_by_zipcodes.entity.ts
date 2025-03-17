import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Zones } from './zones.entity';

@Entity({ name: ENTITY_NAME.ZONE_AREA_BY_ZIPCODES })
export class Zone_Area_By_Zipcodes extends BaseEntity {
  @Column({ nullable: true, type: 'varchar', length: 128 })
  city_name: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  zip_code: string;

  @Column({ nullable: true, type: 'int' })
  zip_code_id: number;

  @RelationId((x: Zone_Area_By_Zipcodes) => x.zone)
  zone_id: number;

  @ManyToOne(() => Zones, (x) => x.zone_area_by_zipcodes)
  @JoinColumn({ name: 'zone_id' })
  zone: Zones;
}
