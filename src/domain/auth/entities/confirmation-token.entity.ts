import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { AuthUserEntity } from './user.entity';

@Entity('confirmation_tokens')
export class ConfirmationTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  token: string;

  @OneToOne(() => AuthUserEntity, (user) => user.confirmationToken, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: AuthUserEntity;

  @Column({
    type: 'timestamptz',
    precision: 3,
  })
  expirationDate: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
