import {Entity, PrimaryGeneratedColumn, Column, AfterLoad} from "typeorm";

@Entity("profiles")
export class Profile {
    
    constructor(userProfile: Partial<Profile>) {
        Object.assign(this, userProfile);
    }

    @PrimaryGeneratedColumn()
    id: number;    

    @Column()
    familyName: string;

    @Column()
    givenName: string;

    @Column({ nullable: true })
    mobileNo: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    city: string;
    
    @Column({ nullable: true })
    state: string;

    @Column({ nullable: true })
    country: string;

    name: string;

    @AfterLoad()
    computeName() {
        this.name = this.givenName + ' ' + this.familyName;
    }
}