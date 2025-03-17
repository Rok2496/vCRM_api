import { ENTITY_NAME } from 'src/common/constant';
import { Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Articles } from './articles.entity';
import { Master_Tag_Categories } from './master_tag_categories.entity';
import { Master_Tags } from './master_tags.entity';

@Entity('article_tags')
export class Article_Tags extends BaseEntity {
  @RelationId((x: Article_Tags) => x.master_tag_category)
  master_tag_category_id: number;

  @ManyToOne(() => Master_Tag_Categories)
  @JoinColumn({ name: 'master_tag_category_id' })
  master_tag_category: Master_Tag_Categories;

  @RelationId((x: Article_Tags) => x.master_tag)
  master_tag_id: number;

  @ManyToOne(() => Master_Tags)
  @JoinColumn({ name: 'master_tag_id' })
  master_tag: Master_Tags;

  @RelationId((x: Article_Tags) => x.article)
  article_id: number;

  @ManyToOne(() => Articles, (articles) => articles.article_tags, { nullable: true })
  @JoinColumn({ name: 'article_id' })
  article: Articles;
} 