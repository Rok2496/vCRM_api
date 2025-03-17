import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Articles } from './articles.entity';
import { Master_Photo_Libraries } from './master_photo_libraries.entity';
import { Master_Video_Libraries } from './master_video_libraries.entity';

@Entity('article_medias')
export class Article_Medias extends BaseEntity {
  @Column({ type: 'varchar', length: 1024 })
  name: string;

  @Column({ type: 'int', nullable: true })
  display_sequence: number;

  @Column({ type: 'boolean' })
  published: boolean;

  @RelationId((x: Article_Medias) => x.master_photo_library)
  master_photo_library_id: number;

  @ManyToOne(() => Master_Photo_Libraries, { nullable: true })
  @JoinColumn({ name: 'master_photo_library_id' })
  master_photo_library: Master_Photo_Libraries;

  @RelationId((x: Article_Medias) => x.master_video_library)
  master_video_library_id: number;

  @ManyToOne(() => Master_Video_Libraries, { nullable: true })
  @JoinColumn({ name: 'master_video_library_id' })
  master_video_library: Master_Video_Libraries;

  @RelationId((x: Article_Medias) => x.article)
  article_id: number;

  @ManyToOne(() => Articles, (articles) => articles.article_medias, { nullable: true })
  @JoinColumn({ name: 'article_id' })
  article: Articles;
} 