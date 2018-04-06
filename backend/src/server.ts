import "reflect-metadata";
import { createExpressServer, useContainer as routingUseContainer} from "routing-controllers";
import {RegistrationController} from "./controllers/RegistrationController";
import express = require("express");
import path = require("path");
import fs = require("fs");
import { createConnection, useContainer as ormUseContainer, Repository } from "typeorm";
import { Form, Field, Restriction, FilledField, FilledForm } from "./models";
import { Container, Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { DevDatabaseCreator } from "./devDatabaseCreator";
import { WSASYSNOTREADY } from "constants";

async function main() {
    try{
        routingUseContainer(Container);
        ormUseContainer(Container);
        let dbConfig = JSON.parse(fs.readFileSync("../config/db.config.json", "utf8"));
        let connection = await createConnection({
            type: dbConfig.type,
            host: dbConfig.host,
            port: dbConfig.port,
            username: dbConfig.username,
            password: dbConfig.password,
            database: dbConfig.database,
            entities: [
                Form,
                Field,
                Restriction,
                FilledForm,
                FilledField
            ],
            synchronize: true,
            logging: true
        });

        console.log("Connected to database");
        await Container.get(DevDatabaseCreator).create();
        console.log("Development database created");

        const app = createExpressServer({
            controllers: [RegistrationController]
        });

        app.use("/", express.static(path.resolve(__dirname, "./frontend/")));

        console.log("Running");
        app.listen(8000);
    } catch(e) {
        console.error(e);
    }
}

main();
