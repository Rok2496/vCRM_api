import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Contacts } from './contacts.entity';

@Entity({ name: ENTITY_NAME.MASTER_CONTACT_TYPE })
export class Master_Contact_Types extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  // External Relations
  @OneToMany(() => Contacts, (x) => x.master_contact_type)
  contacts: Contacts[];
}
