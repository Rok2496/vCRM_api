import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Companies } from './companies.entity';
import { Contacts } from './contacts.entity';

@Entity({ name: ENTITY_NAME.COMPANY_CONTACT_MAPS })
export class Company_Contact_Maps extends BaseEntity {
  @Column({ type: 'varchar', length: 512 })
  name: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  job_title: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'int', nullable: true })
  display_sequence: number;

  @RelationId((x: Company_Contact_Maps) => x.company)
  company_id: number;

  @ManyToOne(() => Companies, (x) => x.company_contact_maps, {
    nullable: false,
  })
  @JoinColumn({ name: 'company_id' })
  company: Companies;

  @RelationId((x: Company_Contact_Maps) => x.contact)
  contact_id: number;

  @ManyToOne(() => Contacts, (x) => x.company_contact_maps, { nullable: false })
  @JoinColumn({ name: 'contact_id' })
  contact: Contacts;
}
