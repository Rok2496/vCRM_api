import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Employees } from './employees.entity';
import { Master_Tag_Categories } from './master_tag_categories.entity';
import { Master_Tags } from './master_tags.entity';


@Entity({ name: ENTITY_NAME.EMPLOYEE_TAGS })
export class Employee_Tags extends BaseEntity {
  @Column({ type: 'varchar', length: 128, nullable: true })
  tag: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  value: string;

  @Column({ type: 'int', nullable: true })
  rating_score: number;

  @Column({ type: 'int', nullable: true })
  display_sequence: number;

  @RelationId((x: Employee_Tags) => x.employee)
  employee_id: number;

  @ManyToOne(() => Employees, (x) => x.employee_tags)
  @JoinColumn({ name: 'employee_id' })
  employee: Employees;



  @RelationId((x: Employee_Tags) => x.master_tag_category)
  master_tag_category_id: number;

  @ManyToOne(() => Master_Tag_Categories, (x) => x.employee_tags, {
    nullable: true,
  })
  @JoinColumn({ name: 'master_tag_category_id' })
  master_tag_category: Master_Tag_Categories;

  @RelationId((x: Employee_Tags) => x.master_tag)
  master_tag_id: number;

  @ManyToOne(() => Master_Tags, (x) => x.employee_tags, { nullable: true })
  @JoinColumn({ name: 'master_tag_id' })
  master_tag: Master_Tags;

  @RelationId((x: Employee_Tags) => x.rated_by_employee)
  rated_by_employee_id: number;

  @ManyToOne(() => Employees, (x) => x.rated_by_employee_tags, {
    nullable: true,
  })
  @JoinColumn({ name: 'rated_by_employee_id' })
  rated_by_employee: Employees;
}
