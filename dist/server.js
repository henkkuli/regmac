"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const RegistrationController_1 = require("./controllers/RegistrationController");
const app = routing_controllers_1.createExpressServer({
    controllers: [RegistrationController_1.RegistrationController],
});
console.log("Running");
app.listen(8000);
