import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { CRUDService } from '../../utils/service/CRUD.service';

@Injectable()
export class CurrencyService extends CRUDService {

  constructor(public afs: AngularFirestore) {
    super(afs);
    this.collectionName = 'country';
    this.initCollection();
  }
}
