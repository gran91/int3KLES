import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CRUDService {

    itemsCollection: AngularFirestoreCollection<any>;
    items: Observable<any[]>;
    itemDoc: AngularFirestoreDocument<any>;
    collectionName: string;
    currentItem: any[];
    init = false;


    constructor(public afs: AngularFirestore) {
    }

    initCollection() {
        this.itemsCollection = this.afs.collection(this.collectionName);
        this.items = this.itemsCollection.snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data();
                data.id = a.payload.doc.id;
                return data;
            });
        });
        this.items.subscribe((value) => {
            if (!this.init) {
                this.currentItem = value;
                this.init = true;
            } else {
                this.checkChanges(value);
            }
        });
    }

    checkChanges(data) {
        let currentValues = this.currentItem.reduce((a, { id }) => Object.assign(a, { [id]: id }), {});
        let newValues = data.reduce((a, { id }) => Object.assign(a, { [id]: id }), {});
        let result = [...this.currentItem.filter(({ id }) => !newValues[id]), ...data.filter(({ id }) => !currentValues[id])];
        console.log('Add:', result);
        Object.keys(this.currentItem).forEach(key => {
            Object.keys(data).forEach(keyData => {
                if (this.currentItem[key].id === data[keyData].id) {
                    if (JSON.stringify(this.currentItem[key]) !== JSON.stringify(data[keyData])) {
                        console.log('OLD:', this.currentItem[key]);
                        console.log('NEW:', data[keyData]);
                    }
                }
            });
        });
    }

    list() {
        return this.items;
    }

    add(item: any) {
        this.itemsCollection.add(item);
    }

    delete(item: any) {
        this.itemDoc = this.afs.doc(this.collectionName + `/${item.id}`);
        this.itemDoc.delete();
    }

    update(item: any) {
        this.itemDoc = this.afs.doc(this.collectionName + `/${item.id}`);
        this.itemDoc.update(item);
    }

}
