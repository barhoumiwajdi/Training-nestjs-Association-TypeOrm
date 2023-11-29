import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Photo } from "./Photo"
import { IsEmail, IsNotEmpty } from 'class-validator'
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

    @OneToMany(() => Photo, (photo) => photo.user)
    photos: Photo[]


}