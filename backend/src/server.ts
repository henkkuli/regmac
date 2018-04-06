import "reflect-metadata";
import {createExpressServer} from "routing-controllers";
import {RegistrationController} from "./controllers/RegistrationController";
import express = require("express");
import proxy = require("express-http-proxy");
import path = require("path");


const app = createExpressServer({
    controllers: [RegistrationController]
});

app.use("/", express.static(path.resolve(__dirname, "./frontend/")));

console.log("Running");
app.listen(8000);
