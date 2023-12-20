import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Photo } from "./Photo"
import { IsEmail, IsNotEmpty } from 'class-validator'
import { Role } from "./Role"
import { Token } from "./Token"

export enum UserRole {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    USER = "USER"
}
@Entity()


export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    @IsEmail()
    email: string

    @Column()
    @IsNotEmpty()
    password: string

    @Column()
    Image: string

    @Column({ default: true })
    Status: Boolean

    @OneToMany(() => Photo, (photo) => photo.user)
    photos: Photo[]

    @OneToMany(() => Token, (token) => token.user)
    tokens: Token[]


    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    Role: UserRole;
}