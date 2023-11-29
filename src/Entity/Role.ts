import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"


@Entity()
export class Role {
    @PrimaryGeneratedColumn()

    id: number

    @Column()
    Name: string;

    @Column()
    Description: string;

}