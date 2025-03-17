import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { App_Users } from './app_users.entity';

@Entity('content_social_shares')
export class Content_Social_Shares extends BaseEntity {
  @Column({ type: 'int' })
  content_id: number;

  @Column({ type: 'varchar', length: 256 })
  shared_by: string;

  @Column({ type: 'varchar', length: 256 })
  shared_to: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  share_link: string;

  @Column({ type: 'varchar', length: 256 })
  social_network_name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @RelationId((x: Content_Social_Shares) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users)
  @JoinColumn({ name: 'user_id' })
  user: App_Users;
} 