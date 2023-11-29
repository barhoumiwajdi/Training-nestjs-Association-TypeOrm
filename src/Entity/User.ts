import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Photo } from "./Photo"
import { IsEmail, IsNotEmpty } from 'class-validator'
import { Role } from "./Role"
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string

    @Column()
    CV: string

    @Column({ default: true })
    Status: Boolean

    @OneToMany(() => Photo, (photo) => photo.user)
    photos: Photo[]

    @ManyToOne(() => Role, (role) => role.users)
    role: Role
}