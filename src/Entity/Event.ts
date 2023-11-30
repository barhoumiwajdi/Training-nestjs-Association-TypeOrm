import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"


@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    start: Date

    @Column()
    end: Date

    @Column()
    color: string

    @Column()
    info: string


}