import {Entity, PrimaryGeneratedColumn, Column, Generated, ManyToMany, ManyToOne, OneToMany, Repository} from "typeorm";
import { Service } from "typedi";

@Entity()
export class Form {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    uuid: string;

    @OneToMany(type => Field, field => field.form)
    fields: Field[];

    @Column()
    name: string;

    public constructor(name: string) {
        this.name = name;
    }
}

@Entity()
export class Field {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    uuid: string;

    @ManyToOne(type => Form, form => form.fields)
    form: Form;

    @Column()
    name: string;

    public constructor(name: string) {
        this.name = name;
    }
}

@Entity()
export class Restriction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    uuid: string;
}

@Entity()
export class FilledField {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Field)
    field: Field;

    @ManyToOne(type => FilledForm)
    form: FilledForm;
}

@Entity()
export class FilledForm {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Field)
    field: Field;

    @OneToMany(type => FilledField, field => field.form)
    fields: FilledField[];
}
