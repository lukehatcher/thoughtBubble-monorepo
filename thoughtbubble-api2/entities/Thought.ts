import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from './Project';

@Entity()
export class Thought extends BaseEntity {
  // extending with base enteity allows for using .find .create etc
  // see TS2564 for bang
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  text!: string;

  @Column('boolean', { default: false })
  completed!: false;

  @Column('boolean', { nullable: true })
  tag!: string;

  @Column()
  projectId!: number;

  @ManyToOne(() => Project, (project) => project.thoughts)
  @JoinColumn({ name: 'projectId' })
  user!: Promise<Project>;
}
