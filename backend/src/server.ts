import "reflect-metadata";
import {createExpressServer} from "routing-controllers";
import {RegistrationController} from "./controllers/RegistrationController";
import express = require("express");
import proxy = require("express-http-proxy");


const app = createExpressServer({
    controllers: [RegistrationController]
});

app.use("/", proxy("http://localhost:3000/"));

console.log("Running");
app.listen(8000);