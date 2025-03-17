import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { App_Users } from './app_users.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: ENTITY_NAME.MASTER_USER_SIGN_AND_OPT_OUT_LINK })
export class Master_User_Sign_And_Opt_Out_Links extends BaseEntity {
  @Column({ type: 'varchar', length: 5000, nullable: true })
  signature: string;

  @Column({ type: 'varchar', nullable: true })
  photo: string;

  @Column({ type: 'text', nullable: true })
  opt_out_message: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  opt_out_link: string;

  @RelationId((x: Master_User_Sign_And_Opt_Out_Links) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: App_Users;
}
