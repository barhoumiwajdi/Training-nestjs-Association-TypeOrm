import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { User } from "./User";


@Entity()
export class Role {
    @PrimaryGeneratedColumn()

    id: number

    @Column()
    Name: string;

    @Column()
    Description: string;


}