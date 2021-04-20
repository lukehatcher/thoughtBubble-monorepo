import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn } from 'typeorm';
import { Project } from './Project';

@Entity()
export class User extends BaseEntity {
  // extending with base enteity allows for using .find .create etc
  // see TS2564 for bangs
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  username!: string;

  @Column('boolean', { default: true })
  dailyEmail!: boolean;

  @Column('boolean', { default: true })
  weeklyEmail!: boolean;

  @Column('boolean', { default: true })
  darkMode!: boolean;

  @Column('text', { unique: true })
  githubId!: string;

  @Column('text')
  email!: string;

  @OneToMany(() => Project, (project) => project.user)
  projects!: Promise<Project[]>;
}
