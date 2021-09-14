import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Activity } from './Activity';
import { Project } from './Project';

export type Direction = 'asc' | 'desc';
export type OrderType = 'lastUpdated' | 'size' | 'alphabetical';

export enum Directions {
  ASC = 'asc',
  DESC = 'desc',
}
export enum OrderTypes {
  LAST_UPDATED = 'lastUpdated',
  ALPHABETICAL = 'alphabetical',
  SIZE = 'size',
}

@Entity()
export class User extends BaseEntity {
  // extending with base enteity allows for using .find .create etc
  // see TS2564 for bangs
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  username!: string;

  @Column('text', { nullable: true }) // nullable cause of the old users in the db
  displayName!: string;

  @Column('text', { nullable: true })
  avatarUrl!: string;

  @Column('boolean', { default: true })
  dailyEmail!: boolean;

  @Column('boolean', { default: true })
  weeklyEmail!: boolean;

  @Column('boolean', { default: true })
  darkMode!: boolean;

  // the order the user wants their projects displayed on main projects screen
  @Column('text', { default: OrderTypes.LAST_UPDATED })
  projectOrder!: OrderType;

  // the direction the user wants their projects displayed on main projects screen
  @Column('text', { default: Directions.DESC })
  projectDirection!: Direction;

  // whether or not the user want to save the order for their next session
  @Column('boolean', { default: false })
  saveOrder!: boolean;

  @Column('text', { unique: true })
  githubId!: string;

  @Column('text')
  email!: string;

  @OneToMany(() => Project, (project) => project.user)
  projects!: Promise<Project[]>;

  @OneToMany(() => Activity, (activity) => activity.user)
  activity!: Promise<Activity[]>;
}
