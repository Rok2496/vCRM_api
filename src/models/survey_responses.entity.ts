import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Surveys } from './surveys.entity';
import { App_Users } from './app_users.entity';
import { Survey_Answers } from './survey_answers.entity';

@Entity('survey_responses')
export class Survey_Responses extends BaseEntity {
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @RelationId((x: Survey_Responses) => x.survey)
  survey_id: number;

  @ManyToOne(() => Surveys, (surveys) => surveys.survey_responses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'survey_id' })
  survey: Surveys;

  @RelationId((x: Survey_Responses) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: App_Users;

  // External Relations
  @OneToMany(() => Survey_Answers, (survey_answers) => survey_answers.response)
  survey_answers: Survey_Answers[];
} 