import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Project } from './Project';
import { User } from './User';

@Entity()
export class Activity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  activityDate!: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User; // typeorm api turns project -> projectId

  @OneToOne(() => Project)
  @JoinColumn()
  project!: Project; // typeorm api turns project -> projectId
}
