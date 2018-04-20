import { Service } from "typedi";
import { InjectRepository, InjectManager } from "typeorm-typedi-extensions";
import { Repository, EntityManager } from "typeorm";
import { Form, Field } from "./models";

@Service()
export class DevDatabaseCreator {
    @InjectManager()
    private manager: EntityManager;

    public async create(): Promise<void> {
        const field11 = new Field("Field 1");
        const field12 = new Field("Field 2");
        const form1 = new Form("Form 1");
        form1.fields = [field11, field12];
        await Promise.all([
            this.manager.save(field11),
            this.manager.save(field12),
        ]);
        await Promise.all([
            this.manager.save(form1),
        ]);
        
        const field21 = new Field("Field 3");
        const field22 = new Field("Field 4");
        const form2 = new Form("Form 2");
        form2.fields = [field21, field22];
        await Promise.all([
            this.manager.save(field21),
            this.manager.save(field22),
        ]);
        await Promise.all([
            this.manager.save(form2),
        ]);
    }
}