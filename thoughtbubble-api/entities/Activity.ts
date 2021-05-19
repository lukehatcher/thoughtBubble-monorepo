import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Project } from './Project';
import { User } from './User';

@Entity()
export class Activity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  activityDate!: Date;

  @ManyToOne(() => User, (user) => user.activity, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  projectId!: string;

  @ManyToOne(() => Project, (project) => project.activity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project!: Project;
}
