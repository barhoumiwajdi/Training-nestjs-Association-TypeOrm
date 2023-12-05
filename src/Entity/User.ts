import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Photo } from "./Photo"
import { IsEmail, IsNotEmpty } from 'class-validator'
import { Role } from "./Role"
import { Token } from "./Token"
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @IsEmail()
    @Column()
    email: string

    @IsNotEmpty()
    @Column()
    password: string

    @Column()
    Image: string

    @Column({ default: true })
    Status: Boolean

    @OneToMany(() => Photo, (photo) => photo.user)
    photos: Photo[]


    @OneToMany(() => Token, (token) => token.user)
    tokens: Token[]


    @ManyToOne(() => Role, (role) => role.users)
    role: Role
}