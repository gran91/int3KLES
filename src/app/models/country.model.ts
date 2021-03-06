import { IModel } from './IModel.model';

export class Country implements IModel {
    id?: string;
    code: string;
    name: string;

    getCollectionName(): String {
        return 'country';
    }

    getListField() {
        return ['code', 'name'];
    }
}
