import { Service } from "typedi";
import { InjectRepository, InjectManager } from "typeorm-typedi-extensions";
import { Repository, EntityManager } from "typeorm";
import { Form, Field, FilledForm, FilledField } from "./models";

@Service()
export class DevDatabaseCreator {
    @InjectManager()
    private manager: EntityManager;

    public async create(): Promise<void> {
        const field11 = new Field("Field 1");
        field11.id = "10000000-0000-0000-0000-000000000001"
        const field12 = new Field("Field 2");
        field12.id = "10000000-0000-0000-0000-000000000002"
        const form1 = new Form("Form 1");
        form1.id = "20000000-0000-0000-0000-000000000001"
        form1.fields = [field11, field12];
        await Promise.all([
            this.manager.save(field11),
            this.manager.save(field12),
        ]);
        await Promise.all([
            this.manager.save(form1),
        ]);

        const filledForm1 = new FilledForm(form1);
        const filledField11 = new FilledField(field11, filledForm1, "Value 1");
        const filledField12 = new FilledField(field12, filledForm1, "Value 2");
        
        await Promise.all([
            this.manager.save(filledForm1),
        ]);
        await Promise.all([
            this.manager.save(filledField11),
            this.manager.save(filledField12),
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