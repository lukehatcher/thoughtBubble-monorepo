// import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
// import { User } from './User';

// @Entity()
// export class Thought extends BaseEntity {
//   // extending with base enteity allows for using .find .create etc
//   // see TS2564 for bang
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column('text')
//   username!: string;

//   @Column('boolean', { default: false })
//   completed!: false;

//   @Column()
//   userId!: number;

//   @ManyToOne(() => User, (user) => user.thoughts)
//   @JoinColumn({ name: 'userId' })
//   user!: Promise<User>;
// }
