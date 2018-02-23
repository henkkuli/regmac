import {JsonController, Param, Body, Get, Post, Put, Delete} from "routing-controllers";

@JsonController()
export class RegistrationController {
    
    @Get("/")
    public index() {
        return {"title": "Index"};
    }

}
