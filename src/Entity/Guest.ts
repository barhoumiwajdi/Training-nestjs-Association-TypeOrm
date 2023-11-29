import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"


@Entity()
export class Guest {
    @PrimaryGeneratedColumn()

    id: number;

    @Column()

    firstName: string;

    @Column()
    lastName: string | null;

    @Column()
    email: string | null;

}