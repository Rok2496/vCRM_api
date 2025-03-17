import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Companies } from './companies.entity';

@Entity({ name: ENTITY_NAME.MASTER_COMPANY_TYPE })
export class Master_Company_Types extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  // External Relations
  @OneToMany(() => Companies, (x) => x.master_company_type)
  companies: Companies[];
}
