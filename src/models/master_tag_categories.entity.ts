import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company_Tags } from './company_tags.entity';
import { Contact_Tags } from './contact_tags.entity';
import { Employee_Tags } from './employee_tags.entity';
import { Master_Tags } from './master_tags.entity';

@Entity({ name: ENTITY_NAME.MASTER_TAG_CATEGORY })
export class Master_Tag_Categories extends BaseEntity {
  @Column({ type: 'varchar', length: 1024, nullable: true })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'varchar', nullable: true })
  tag: string;

  @Column({ nullable: true, type: 'int' })
  display_sequence: number;

  @Column({ type: 'boolean' })
  public_or_private: boolean;

  // External Relations
  @OneToMany(() => Master_Tags, (masterTag) => masterTag.master_tag_category)
  master_tags: Master_Tags[];

  @OneToMany(() => Employee_Tags, (x) => x.master_tag_category)
  employee_tags: Employee_Tags[];

  @OneToMany(() => Company_Tags, (x) => x.master_tag_category)
  company_tags: Company_Tags[];

  @OneToMany(() => Contact_Tags, (x) => x.master_tag_category)
  contact_tags: Contact_Tags[];
}
