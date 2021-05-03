import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Project } from './Project';

@Entity()
export class Thought extends BaseEntity {
  // extending with base enteity allows for using .find .create etc
  // see TS2564 for bang
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn()
  createdDate!: Date;

  @Column()
  creationLocation!: string;

  @Column({ nullable: true })
  lastUpdatedDate!: Date;

  @Column('text')
  text!: string;

  @Column('boolean', { default: false })
  completed!: boolean;

  @Column('text', { nullable: true })
  tag!: string;

  @Column()
  projectId!: string;

  @ManyToOne(() => Project, (project) => project.thoughts, { onDelete: 'CASCADE' })
  // when delete a proj, all thoughts get deleted
  // can still individually delete thoughts though
  @JoinColumn({ name: 'projectId' })
  user!: Promise<Project>;
}
