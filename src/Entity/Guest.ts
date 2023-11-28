import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"


@Entity()
export class Guest {
    @PrimaryGeneratedColumn()
    @Column
    declare id: number;

    @Column

    declare firstName: string;

    @Column
    declare lastName: string | null;

    @Column
    declare email: string | null;

}