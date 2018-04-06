import {JsonController, Param, Body, Get, Post, Put, Delete} from "routing-controllers";
import { Inject } from "typedi";
import { Repository } from "typeorm";
import { Form } from "../models";
import { InjectRepository } from "typeorm-typedi-extensions";

@JsonController("/api")
export class RegistrationController {
    @InjectRepository(Form)
    private formRepository: Repository<Form>;
    
    @Get("/getForms")
    public async index() {
        const forms = await this.formRepository.find({ relations: ["fields"] });
        return [...forms.map(form => form)];
    }
}
