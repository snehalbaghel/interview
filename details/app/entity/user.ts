import {Entity, PrimaryGeneratedColumn, Column,
    BeforeInsert,
    BeforeUpdate,
    Unique,
    JoinColumn,
    OneToOne,} from "typeorm";
import bcrypt from "bcrypt";
import uuid = require("uuid");
import { Profile } from "./profile";

@Entity("users")
@Unique(["username", "email"])
export class User {

    constructor(user: Partial<User>) {
        Object.assign(this, user);
     }

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    username: string;

    @Column()
    passwordHash: string;

    @Column()
    email: string;

    @OneToOne(type => Profile)
    @JoinColumn()
    profile: Profile;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if(!this.passwordHash) {
            this.passwordHash = uuid();
        }
        if(!this.username) {
            this.username = uuid();
        }
        const salt: string = await bcrypt.genSalt(10)
        this.passwordHash = await bcrypt.hash(this.passwordHash, salt)
    }

    async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.passwordHash)
    }

}