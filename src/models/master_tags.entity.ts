import { ENTITY_NAME } from 'src/common/constant';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Company_Tags } from './company_tags.entity';
import { Contact_Tags } from './contact_tags.entity';
import { Employee_Tags } from './employee_tags.entity';
import { Master_Tag_Categories } from './master_tag_categories.entity';

@Entity({ name: ENTITY_NAME.MASTER_TAG })
export class Master_Tags extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, type: 'varchar', length: 5000 })
  synonyms: string;

  @Column({ nullable: true, type: 'int' })
  display_sequence: number;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @RelationId((x: Master_Tags) => x.master_tag_category)
  master_tag_category_id: number;

  @ManyToOne(
    () => Master_Tag_Categories,
    (masterTagCategory) => masterTagCategory.master_tags,
    { nullable: true },
  )
  @JoinColumn({ name: 'master_tag_category_id' })
  master_tag_category: Master_Tag_Categories;

  // External Relations
  @OneToMany(() => Employee_Tags, (x) => x.master_tag)
  employee_tags: Employee_Tags[];

  @OneToMany(() => Company_Tags, (x) => x.master_tag)
  company_tags: Company_Tags[];

  @OneToMany(() => Contact_Tags, (x) => x.master_tag)
  contact_tags: Contact_Tags[];
}
