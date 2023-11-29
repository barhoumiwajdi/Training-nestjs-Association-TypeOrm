import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"


@Entity()
export class Event {
    @PrimaryGeneratedColumn()

    id: number;

    @Column()

    Title: string;

    @Column()
    Description: string | null;

    @Column()
    Lieu: string | null;


    @Column()
    Date: Date | null;

}