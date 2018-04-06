import { Entity, PrimaryGeneratedColumn, Column, Generated, ManyToMany, ManyToOne, OneToMany, Repository } from "typeorm";

@Entity()
export class Form {
    @PrimaryGeneratedColumn("uuid")
    id: string;

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
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => Form, form => form.fields)
    form: Form;

    @Column()
    name: string;

    @Column({ nullable: true })
    restrictions: string;

    public constructor(name: string) {
        this.name = name;
    }
}

@Entity()
export class FilledField {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => Field)
    field: Field;

    @ManyToOne(type => FilledForm)
    form: FilledForm;
}

@Entity()
export class FilledForm {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => Field)
    field: Field;

    @OneToMany(type => FilledField, field => field.form)
    fields: FilledField[];
}
