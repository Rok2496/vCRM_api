import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Surveys } from './surveys.entity';
import { Survey_Options } from './survey_options.entity';
import { Survey_Answers } from './survey_answers.entity';

@Entity('survey_questions')
export class Survey_Questions extends BaseEntity {
  @Column({ type: 'text' })
  question_text: string;

  @Column({ 
    type: 'varchar', 
    length: 50,
    enum: ['Multiple Choice', 'Single Choice', 'Text', 'Rating']
  })
  question_type: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @RelationId((x: Survey_Questions) => x.survey)
  survey_id: number;

  @ManyToOne(() => Surveys, (surveys) => surveys.survey_questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'survey_id' })
  survey: Surveys;

  // External Relations
  @OneToMany(() => Survey_Options, (survey_options) => survey_options.question)
  survey_options: Survey_Options[];

  @OneToMany(() => Survey_Answers, (survey_answers) => survey_answers.question)
  survey_answers: Survey_Answers[];
} 