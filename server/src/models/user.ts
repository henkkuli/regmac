import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string|undefined;

    @Column()
    public name: string;

    @Column()
    public passwordHash: string;

    public constructor(name: string, passwordHash: string) {
        this.name = name;
        this.passwordHash = passwordHash;
    }
}