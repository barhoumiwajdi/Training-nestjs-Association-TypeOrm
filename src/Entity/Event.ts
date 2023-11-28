import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"


@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    @Column
    declare id: number;

    @Column

    declare Title: string;

    @Column
    declare Description: string | null;

    @Column
    declare Lieu: string | null;


    @Column
    declare Date: Date | null;

}