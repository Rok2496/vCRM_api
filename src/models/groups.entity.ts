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

@Entity({ name: ENTITY_NAME.GROUPS })
export class Groups extends BaseEntity {
  @Column({ type: 'varchar', length: 512 })
  group_name: string;

  @Column({ type: 'text', nullable: true })
  group_description: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  group_type: string;

  @Column({ type: 'int', nullable: true })
  number_of_members: number;

  @RelationId((x: Groups) => x.created_by_user)
  create_by_user_id: number;

  @ManyToOne(() => App_Users, (x) => x.groups, { nullable: true })
  @JoinColumn({ name: 'create_by_user_id' })
  created_by_user: App_Users;

  // External Relations
  @OneToMany(() => Group_Members, (x) => x.group)
  group_members: Group_Members[];

  @OneToMany(() => Group_Messages, (x) => x.group)
  group_messages: Group_Messages[];
}
