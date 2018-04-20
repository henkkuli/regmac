import {JsonController, Param, Body, Get, Post, Put, Delete, OnUndefined, BadRequestError, NotFoundError, InternalServerError} from "routing-controllers";
import { Inject } from "typedi";
import { Repository, EntityManager } from "typeorm";
import { Form, FilledField, FilledForm, Field } from "../models";
import { InjectRepository, InjectManager } from "typeorm-typedi-extensions";

type FormData = Array<{
    id: string;
    value: string;
}>;

@JsonController("/api")
export class RegistrationController {
    @InjectRepository(Form)
    private formRepository: Repository<Form>;
    @InjectRepository(Field)
    private fieldRepository: Repository<Field>;
    @InjectRepository(FilledForm)
    private filledFormRepository: Repository<FilledForm>;
    @InjectRepository(FilledField)
    private filledFieldRepository: Repository<FilledField>;
    @InjectManager()
    private manager: EntityManager;
    
    @Get("/form")
    public async allForms() {
        const forms = await this.formRepository.find({ relations: ["fields"] });
        return [...forms.map(form => form)];
    }

    @Get("/form/:uuid([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})")
    @OnUndefined(404)
    public async form(@Param("uuid") uuid: string) {
        const form = await this.formRepository.findOneById(uuid, { relations: ["fields"] });
        if (!form) throw new NotFoundError("Form not found");
        return form;
    }

    @Post("/form/:uuid([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})")
    public async sendForm(@Param("uuid") uuid: string, @Body() fields: FormData) {
        const form = await this.formRepository.findOneById(uuid, { relations: ["fields"] });
        if (!form) throw new NotFoundError("Form not found");

        const filledForm = new FilledForm(form);
        filledForm.fields = [];

        for (let filled of fields) {
            const field = form.fields.find(field => field.id === filled.id);
            if (!field)
                throw new BadRequestError("Bad field id");

            filledForm.fields.push(new FilledField(field, filledForm, filled.value));
        }

        // Keep the saving in a transaction
        await this.manager.transaction(async manager => {
            // Save all fields
            await Promise.all(
                filledForm.fields.map(field =>
                    manager.save(field)
                )
            );
            // And then save the form
            await Promise.all([
                manager.save(form),
            ]);
        });

        return { "message": "OK" };
    }

    @Get("/form/:uuid([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/registrations")
    @OnUndefined(404)
    // TODO: Authorization
    public async getRegistrations(@Param("uuid") uuid: string) {
        const form = await this.formRepository.findOneById(uuid, { relations: ["fields"] });
        if (!form) throw new NotFoundError("Form not found");
        const filledForm = await this.filledFormRepository.find({ where: { form: form }, relations: ["fields", "fields.field"] });
        if (!filledForm) throw new InternalServerError("Database error");

        return filledForm;
    }
}
