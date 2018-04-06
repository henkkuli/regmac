import { Service } from "typedi";
import { InjectRepository, InjectManager } from "typeorm-typedi-extensions";
import { Repository, EntityManager } from "typeorm";
import { Form, Field } from "./models";

@Service()
export class DevDatabaseCreator {
    @InjectManager()
    private manager: EntityManager;

    public async create(): Promise<void> {
        const field1 = new Field("Field 1");
        const field2 = new Field("Field 2");
        const form1 = new Form("Form 1");
        form1.fields = [field1, field2];
        await Promise.all([
            this.manager.save(field1),
            this.manager.save(field2),
        ]);
        await Promise.all([
            this.manager.save(form1),
        ]);
    }
}