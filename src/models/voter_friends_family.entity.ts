import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Voters } from './voters.entity';

@Entity('voter_friends_family')
export class Voter_Friends_Family extends BaseEntity {
  @Column({ 
    type: 'varchar', 
    length: 50,
    enum: ['Friend', 'Family', 'Family-Spouse', 'Colleague', 'Neighbor', 'Acquaintance']
  })
  friends_family_type: string;

  @Column({ type: 'int', nullable: true })
  influence_score: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @RelationId((x: Voter_Friends_Family) => x.primary_voter)
  primary_voter_id: number;

  @ManyToOne(() => Voters, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'primary_voter_id' })
  primary_voter: Voters;

  @RelationId((x: Voter_Friends_Family) => x.related_voter)
  related_voter_id: number;

  @ManyToOne(() => Voters, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'related_voter_id' })
  related_voter: Voters;
} 