import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Article_Medias } from './article_medias.entity';
import { Article_Tags } from './article_tags.entity';
import { Article_Like_Comments } from './article_like_comments.entity';

@Entity('articles')
export class Articles extends BaseEntity {
  @Column({ type: 'varchar', length: 256 })
  title: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  public_url: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  document_version: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  seo_tags: string;

  @Column({ type: 'timestamp', nullable: true })
  published_date: Date;

  @Column({ type: 'varchar', length: 128, nullable: true })
  author: string;

  @Column({ type: 'boolean' })
  draft_or_published: boolean;

  @Column({ type: 'boolean' })
  internal_or_external: boolean;

  @Column({ type: 'boolean' })
  article_or_community_issue: boolean;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  tags: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  image: string;

  // External Relations
  @OneToMany(() => Article_Medias, (article_medias) => article_medias.article)
  article_medias: Article_Medias[];

  @OneToMany(() => Article_Tags, (article_tags) => article_tags.article)
  article_tags: Article_Tags[];

  @OneToMany(() => Article_Like_Comments, (article_like_comments) => article_like_comments.article)
  article_like_comments: Article_Like_Comments[];
} 