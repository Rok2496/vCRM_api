import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Group_Members } from './group_members.entity';
import { Groups } from './groups.entity';

@Entity({ name: ENTITY_NAME.GROUP_MESSAGES })
export class Group_Messages extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  message: string;

  @Column({ type: 'timestamp', nullable: true })
  message_date_time: Date;

  @Column({ type: 'varchar', length: 256, nullable: true })
  message_from_crm_group_member_id: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  message_to: string;

  @Column({ type: 'boolean' })
  message_status_sent: boolean;

  @Column({ type: 'varchar', nullable: true })
  message_attachment: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  message_attachment_type: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  message_attachment_size: string;

  @RelationId((x: Group_Messages) => x.group)
  group_id: number;

  @ManyToOne(() => Groups, (x) => x.group_messages, { nullable: true })
  @JoinColumn({ name: 'group_id' })
  group: Groups;

  @RelationId((x: Group_Messages) => x.group_member)
  group_member_id: number;

  @ManyToOne(() => Group_Members, (x) => x.group_messages, { nullable: true })
  @JoinColumn({ name: 'group_member_id' })
  group_member: Group_Members;
}
