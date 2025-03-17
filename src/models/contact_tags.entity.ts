import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Contacts } from './contacts.entity';
import { Master_Tag_Categories } from './master_tag_categories.entity';
import { Master_Tags } from './master_tags.entity';

@Entity({ name: ENTITY_NAME.CONTACT_TAGS })
export class Contact_Tags extends BaseEntity {
  @Column({ type: 'varchar', length: 128, nullable: true })
  tag: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  tag_value: string;

  @Column({ type: 'int', nullable: true })
  display_sequence: number;

  @Column({ type: 'int', nullable: true })
  rating_score: number;

  @RelationId((x: Contact_Tags) => x.contact)
  contact_id: number;

  @ManyToOne(() => Contacts, (x) => x.contact_tags, { nullable: false })
  @JoinColumn({ name: 'contact_id' })
  contact: Contacts;

  @RelationId((x: Contact_Tags) => x.master_tag_category)
  master_tag_category_id: number;

  @ManyToOne(() => Master_Tag_Categories, (x) => x.contact_tags, {
    nullable: true,
  })
  @JoinColumn({ name: 'master_tag_category_id' })
  master_tag_category: Master_Tag_Categories;

  @RelationId((x: Contact_Tags) => x.master_tag)
  master_tag_id: number;

  @ManyToOne(() => Master_Tags, (x) => x.contact_tags, { nullable: true })
  @JoinColumn({ name: 'master_tag_id' })
  master_tag: Master_Tags;
}
