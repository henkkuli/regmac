import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Form } from './form';
import { FieldData } from './fieldData';

@Entity()
export class FormData {
  @PrimaryGeneratedColumn('uuid')
  public id: string | undefined;

  @ManyToOne((type) => Form)
  public form!: Promise<Form>;

  @OneToMany((type) => FieldData, (field) => field.form)
  public field!: Promise<FieldData[]>;
}
