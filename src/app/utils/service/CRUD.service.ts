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
