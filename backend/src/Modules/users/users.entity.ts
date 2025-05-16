import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('appuser')
@Unique(['username', 'email'])
export class appuser {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  bio: Text;

  @Column({ nullable: true })
  profilephotourl: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: 0 })
  bpcoins: number;

  @Column({ default: 0 })
  lvl: number;

  @Column({ default: 0 })
  xp: number;

  @Column({ type: 'boolean', default: false })
  isVerified?: boolean;
}
