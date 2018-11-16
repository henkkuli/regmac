import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Field } from './field';
import { FormData } from './formData';

@Entity()
export class FieldData {
  @PrimaryGeneratedColumn('uuid')
  public id: string | undefined;

  @ManyToOne((type) => Field)
  public field!: Promise<Field>;

  @ManyToOne((type) => FormData)
  public form!: Promise<FormData>;
}
