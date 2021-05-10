import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Project } from './Project';
import { User } from './User';

@Entity()
export class Activity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  activityDate!: Date;

  // @OneToOne(() => User)
  // @JoinColumn()
  // user!: User; // typeorm api turns project -> projectId

  // @OneToOne(() => Project)
  // @JoinColumn()
  // project!: Project; // typeorm api turns project -> projectId

  @ManyToOne(() => User, (user) => user.activity)
  // @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Project, (project) => project.activity)
  // @JoinColumn({ name: 'userId' })
  project!: Project;
}
