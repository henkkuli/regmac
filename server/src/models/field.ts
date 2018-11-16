import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { Form } from './form';
import { FieldData } from './fieldData';

export enum FieldType {
  STATIC_TEXT,
  TEXT,
  TEXTAREA,
}

export type FieldExtraOptions = any;

@Entity()
export class Field {
  @PrimaryGeneratedColumn('uuid')
  public id: string | undefined;

  @Column()
  public name!: string;

  // TODO: Change to be enum
  @Column('int')
  public type!: FieldType;

  @Column('simple-json', { nullable: true })
  public extraOptions?: FieldExtraOptions;

  @ManyToOne((type) => Form, { cascade: true })
  public form!: Promise<Form>;

  @OneToMany((type) => FieldData, (data) => data.field)
  public data!: Promise<FieldData[]>;

  public constructor(name: string, type: FieldType, extraOptions?: FieldExtraOptions) {
    this.name = name;
    this.type = type;
    this.extraOptions = extraOptions;
  }
}
