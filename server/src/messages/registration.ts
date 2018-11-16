import { FieldType, FieldExtraOptions } from 'src/models/field';

// tslint:disable:max-classes-per-file

export class GetFormResponse {
  public id!: string;
  public name!: string;
  public fields!: Array<GetFormResponseField>;
}

export class GetFormResponseField {
  public id!: string;
  public name!: string;
  public type!: FieldType;
  public extraOptions!: FieldExtraOptions;
}

export class SubmitRequest {

}

export class SubmitResponse {

}
