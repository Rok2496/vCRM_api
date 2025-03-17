import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Master_Tag_Categories } from './master_tag_categories.entity';
import { Master_Tags } from './master_tags.entity';
import { Voters } from './voters.entity';

@Entity('VoterTags')
export class VoterTags extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'integer', nullable: true })
  display_sequence: number;

  @Column({ type: 'integer', nullable: true })
  score: number;

  @RelationId((x: VoterTags) => x.voter)
  voter_id: number;

  @ManyToOne(() => Voters, (x) => x.voter_tags, { nullable: true })
  @JoinColumn({ name: 'voter_id' })
  voter: Voters;

  @RelationId((x: VoterTags) => x.master_tag_category)
  master_tag_category_id: number;

  @ManyToOne(() => Master_Tag_Categories, { nullable: true })
  @JoinColumn({ name: 'master_tag_category_id' })
  master_tag_category: Master_Tag_Categories;

  @RelationId((x: VoterTags) => x.master_tag)
  master_tag_id: number;

  @ManyToOne(() => Master_Tags, { nullable: true })
  @JoinColumn({ name: 'master_tag_id' })
  master_tag: Master_Tags;
} 