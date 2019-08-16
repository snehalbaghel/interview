import {Entity, PrimaryGeneratedColumn, Column,
    BeforeInsert,
    BeforeUpdate,} from "typeorm";
import bcrypt from "bcrypt";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    passwordHash: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        const salt: string = await bcrypt.genSalt(10)
        this.passwordHash = await bcrypt.hash(this.passwordHash, salt)
    }

    async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.passwordHash)
    }

}

export class PasswordHelper {
    
}