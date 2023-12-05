import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    token: String


    @ManyToOne(() => User, (user) => user.tokens)
    user: User

}