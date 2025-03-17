import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Master_Countries } from './master_countries.entity';

@Entity('donations')
export class Donations extends BaseEntity {
  @Column({ type: 'varchar', length: 512 })
  donor_full_name: string;

  @Column({ type: 'varchar', length: 256 })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  street_address: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  zip_code: string;

  @Column({ type: 'float' })
  donation_amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  donation_date: Date;

  @Column({ type: 'boolean', default: false })
  payment_completed: boolean;

  @Column({ type: 'varchar', length: 256, nullable: true })
  transaction_id: string;

  @Column({ 
    type: 'varchar', 
    length: 128,
    enum: ['Credit Card', 'Bank Transfer', 'PayPal', 'Crypto', 'Check', 'Zelle']
  })
  payment_method: string;

  @Column({ type: 'varchar', length: 4, nullable: true })
  card_last_four: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  authorization_code: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  zelle_transaction_id: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  zelle_email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  zelle_phone: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  check_number: string;

  @Column({ type: 'timestamp', nullable: true })
  check_date: Date;

  @Column({ type: 'varchar', length: 256, nullable: true })
  bank_name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  routing_number: string;

  @Column({ type: 'varchar', length: 4, nullable: true })
  account_number_last_four: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  billing_address: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  billing_city: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  billing_state: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  billing_zip_code: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  donor_ip_address: string;

  @Column({ type: 'text', nullable: true })
  donor_device_info: string;

  @Column({ type: 'text', nullable: true })
  donor_notes: string;

  @Column({ type: 'boolean', default: false })
  recurring: boolean;

  @Column({ 
    type: 'varchar', 
    length: 50,
    enum: ['One-Time', 'Monthly', 'Quarterly', 'Annually'],
    default: 'One-Time'
  })
  recurring_interval: string;

  @Column({ type: 'boolean', default: false })
  is_anonymous: boolean;

  @RelationId((x: Donations) => x.country)
  country_id: number;

  @ManyToOne(() => Master_Countries, { nullable: true })
  @JoinColumn({ name: 'country_id' })
  country: Master_Countries;
} 