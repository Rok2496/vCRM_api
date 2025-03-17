import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Survey_Responses } from './survey_responses.entity';
import { Survey_Questions } from './survey_questions.entity';
import { Survey_Options } from './survey_options.entity';

@Entity('survey_answers')
export class Survey_Answers extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  answer_text: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @RelationId((x: Survey_Answers) => x.response)
  response_id: number;

  @ManyToOne(() => Survey_Responses, (survey_responses) => survey_responses.survey_answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'response_id' })
  response: Survey_Responses;

  @RelationId((x: Survey_Answers) => x.question)
  question_id: number;

  @ManyToOne(() => Survey_Questions, (survey_questions) => survey_questions.survey_answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id' })
  question: Survey_Questions;

  @RelationId((x: Survey_Answers) => x.option)
  option_id: number;

  @ManyToOne(() => Survey_Options, (survey_options) => survey_options.survey_answers, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'option_id' })
  option: Survey_Options;
} 