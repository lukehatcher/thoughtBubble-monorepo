import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Thought } from './Thought';
import { User } from './User';
// import { Thought } from './Thought';

@Entity()
export class Project extends BaseEntity {
  // extending with base enteity allows for using .find .create etc
  // see TS2564 for bang
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  projectName!: string;

  @Column('boolean', { default: false })
  completed!: false;

  @Column()
  userId!: string;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'userId' })
  user!: Promise<User>;

  @OneToMany(() => Thought, (thought) => thought.projectId)
  thoughts!: Promise<Thought[]>;
}
