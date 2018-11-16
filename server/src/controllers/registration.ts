import { Service } from 'typedi';
import { JsonController, Get, Body, Post, Param, NotFoundError } from 'routing-controllers';
import { InjectManager } from 'typeorm-typedi-extensions';
import { SubmitRequest, SubmitResponse, GetFormResponse } from '../messages/registration';
import { EntityManager } from 'typeorm';
import { Form } from '../models/form';

@Service()
@JsonController('/registration')
export class RegistrationController {
  @InjectManager()
  private entityManager!: EntityManager;

  @Get('/forms/:id')
  public async getForm(@Param('id') id: string): Promise<GetFormResponse> {
    const form = await this.entityManager.findOne(Form, id);
    if (!form) {
      throw new NotFoundError('Form not found');
    }

    const fields = await form.fields;

    return {
      id: form.id!,
      name: form.name,
      fields: fields.map((field) => ({
        id: field.id!,
        name: field.name,
        type: field.type,
        extraOptions: field.extraOptions,
      })),
    };
  }

  @Post('/forms/:id')
  public async submit(@Body({ validate: true, required: true }) body: SubmitRequest, @Param('id') id: string):
                      Promise<SubmitResponse> {
    throw new NotFoundError('Page not found');
  }
}
