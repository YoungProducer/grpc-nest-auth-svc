import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ConfirmationTokenEntity } from './confirmation-token.entity';
import { RefreshTokenEntity } from 'src/domain/tokens/entities/refresh-token.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  username: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  salt: string;

  @Column('varchar')
  hash: string;

  @OneToOne(() => ConfirmationTokenEntity, (token) => token.user, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  confirmationToken: ConfirmationTokenEntity;

  @OneToMany(() => RefreshTokenEntity, (token) => token.user, {
    cascade: true,
  })
  refreshTokens: RefreshTokenEntity[];

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
