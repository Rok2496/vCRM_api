import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Articles } from './articles.entity';
import { App_Users } from './app_users.entity';

@Entity('article_like_comments')
export class Article_Like_Comments extends BaseEntity {
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'varchar', length: 256 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'boolean' })
  like_dislike: boolean;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @RelationId((x: Article_Like_Comments) => x.article)
  article_id: number;

  @ManyToOne(() => Articles, (articles) => articles.article_like_comments, { nullable: true })
  @JoinColumn({ name: 'article_id' })
  article: Articles;

  @RelationId((x: Article_Like_Comments) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users)
  @JoinColumn({ name: 'user_id' })
  user: App_Users;
} 