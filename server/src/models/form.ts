import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Field } from './field';
import { FormData } from './formData';

@Entity()
export class Form {
  @PrimaryGeneratedColumn('uuid')
  public id: string | undefined;

  @Column()
  public name!: string;

  @OneToMany((type) => Field, (field) => field.form)
  public fields!: Promise<Field[]>;

  @OneToMany((type) => FormData, (data) => data.form)
  public data!: Promise<FormData[]>;

  public constructor(name: string, fields?: Field[]) {
    this.name = name;
    if (fields !== undefined) {
      this.fields = Promise.resolve(fields);
    }
  }
}
