import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
// import { Thought } from './Thought';

@Entity()
export class Project extends BaseEntity {
  // extending with base enteity allows for using .find .create etc
  // see TS2564 for bang
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  projectName!: string;

  @Column('boolean', { default: false })
  completed!: false;

  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'userId' })
  user!: Promise<User>;
}
