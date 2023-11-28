import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"


@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    @Column
    id: number

    @Column
    Name: string;

    @Column
    Description: string;

}