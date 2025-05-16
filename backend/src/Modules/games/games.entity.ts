import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('game')
@Unique(['name'])
export class game {
  @PrimaryGeneratedColumn()
  gameid: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: Text;

  @Column({ nullable: true })
  steamurl: string;

  @Column({ nullable: true })
  iconurl: string;

  @Column({ nullable: true })
  coverurl: string;

  @Column({ nullable: true })
  bannerurl: string;
}
