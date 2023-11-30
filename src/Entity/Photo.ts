import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  filePath: string

  @Column('text')
  description: string;

  @Column('int')
  views: number;

  @Column({ default: true })
  isPublished: boolean;

  @ManyToOne(() => User, (user) => user.photos)
  user: User
}
