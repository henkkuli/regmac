import {JsonController, Param, Body, Get, Post, Put, Delete, OnUndefined} from "routing-controllers";
import { Inject } from "typedi";
import { Repository } from "typeorm";
import { Form } from "../models";
import { InjectRepository } from "typeorm-typedi-extensions";

@JsonController("/api")
export class RegistrationController {
    @InjectRepository(Form)
    private formRepository: Repository<Form>;
    
    @Get("/allForms")
    public async allForms() {
        const forms = await this.formRepository.find({ relations: ["fields"] });
        return [...forms.map(form => form)];
    }

    @Get("/form/:uuid([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})")
    @OnUndefined(404)
    public async form(@Param("uuid") uuid: string) {
        const form = await this.formRepository.findOneById(uuid, { relations: ["fields"] });
        return form;
    }
}
