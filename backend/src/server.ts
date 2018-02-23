import "reflect-metadata";
import {createExpressServer} from "routing-controllers";
import {RegistrationController} from "./controllers/RegistrationController";

const app = createExpressServer({
    controllers: [RegistrationController],
});

console.log("Running");
app.listen(8000);