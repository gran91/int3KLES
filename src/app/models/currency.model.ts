import { IModel } from './IModel.model';

export class Currency implements IModel {
    id?: string;
    code: string;
    name: string;
    symbol: string;

    getCollectionName(): String {
        return 'currency';
    }

    getListField() {
        return ['code', 'name', 'symbol'];
    }
}
