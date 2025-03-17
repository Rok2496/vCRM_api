import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { App_Users } from './app_users.entity';
import { Survey_Questions } from './survey_questions.entity';
import { Survey_Responses } from './survey_responses.entity';

@Entity('surveys')
export class Surveys extends BaseEntity {
  @Column({ type: 'varchar', length: 256 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @RelationId((x: Surveys) => x.created_by)
  created_by_id: number;

  @ManyToOne(() => App_Users, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by_id' })
  created_by: App_Users;

  // External Relations
  @OneToMany(() => Survey_Questions, (survey_questions) => survey_questions.survey)
  survey_questions: Survey_Questions[];

  @OneToMany(() => Survey_Responses, (survey_responses) => survey_responses.survey)
  survey_responses: Survey_Responses[];
} 