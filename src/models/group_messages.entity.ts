import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { App_Users } from './app_users.entity';
import { Groups } from './groups.entity';

@Entity('group_messages')
export class Group_Messages extends BaseEntity {
  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  sent_date_time: Date;

  @Column({ type: 'boolean', default: false })
  is_read: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  attachment_url: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  attachment_type: string;

  @RelationId((x: Group_Messages) => x.group)
  group_id: number;

  @ManyToOne(() => Groups, (groups) => groups.group_messages)
  @JoinColumn({ name: 'group_id' })
  group: Groups;

  @RelationId((x: Group_Messages) => x.sender)
  sender_id: number;

  @ManyToOne(() => App_Users)
  @JoinColumn({ name: 'sender_id' })
  sender: App_Users;
}
