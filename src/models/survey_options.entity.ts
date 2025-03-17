import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Survey_Questions } from './survey_questions.entity';
import { Survey_Answers } from './survey_answers.entity';

@Entity('survey_options')
export class Survey_Options extends BaseEntity {
  @Column({ type: 'text' })
  option_text: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @RelationId((x: Survey_Options) => x.question)
  question_id: number;

  @ManyToOne(() => Survey_Questions, (survey_questions) => survey_questions.survey_options, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id' })
  question: Survey_Questions;

  // External Relations
  @OneToMany(() => Survey_Answers, (survey_answers) => survey_answers.option)
  survey_answers: Survey_Answers[];
} 