import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Activity } from './Activity';
import { Thought } from './Thought';
import { User } from './User';
// import { Thought } from './Thought';

@Entity()
export class Project extends BaseEntity {
  // extending with base enteity allows for using .find .create etc
  // see TS2564 for bang
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn()
  createdDate!: Date;

  @Column()
  creationLocation!: string;

  @CreateDateColumn({ nullable: true })
  lastUpdatedDate!: Date;

  // archive data
  @Column('boolean', { default: false })
  archived!: boolean;

  @Column({ nullable: true })
  archivedDate!: Date;
  // ============

  // pinned data
  @Column('boolean', { default: false })
  pinned!: boolean;

  @Column({ nullable: true })
  pinDate!: Date;
  // ============

  @Column('text', { nullable: true })
  tag!: string;

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

  @OneToMany(() => Activity, (activity) => activity.project)
  activity!: Promise<Activity[]>;
}
