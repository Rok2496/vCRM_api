import { ENTITY_NAME } from 'src/common/constant';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { App_Users } from './app_users.entity';
import { BaseEntity } from './base.entity';
import { Group_Members } from './group_members.entity';
import { Group_Messages } from './group_messages.entity';

@Entity('groups')
export class Groups extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image_url: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @RelationId((x: Groups) => x.created_by)
  created_by_id: number;

  @ManyToOne(() => App_Users, { nullable: true })
  @JoinColumn({ name: 'created_by_id' })
  created_by: App_Users;

  // External Relations
  @OneToMany(() => Group_Members, (group_members) => group_members.group)
  group_members: Group_Members[];

  @OneToMany(() => Group_Messages, (group_messages) => group_messages.group)
  group_messages: Group_Messages[];
}
