import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument, DocumentSnapshot,
  QueryFn
} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs/index';
import {take, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService<Item> {

  constructor(
    private angularFirestore: AngularFirestore,
  ) {
  }

  insert(path: string, item: Item): Promise<any> {
    return this.col(path).add(item);
  }

  upsert(path: string, id: string, data: any): Promise<void> {
    return this.doc(path, id).set(data);
  }

  async create(path: string, id: string, data: Item) {
    if (await this.doc(path, id).get().toPromise()
      .then((doc: DocumentSnapshot<Item>) => !doc.exists)) {
      this.upsert(path, id, data);
    }
  }

  update(path: string, id: string, item: Item): Promise<void> {
    return this.doc(path, id).update(item);
  }

  get(path: string, id: string): Observable<Item> {
    return this.doc(path, id).valueChanges();
  }

  list(path: string, queryFn?: QueryFn): Observable<Item[]> {
    return this.colWithIds(path, queryFn);
  }

  delete(path: string, id: string): Promise<void> {
    return this.doc(path, id).delete();
  }

  check(path: string, key: string, value: string): Observable<boolean> {
    if (!value) {
      return of(false);
    }
    return this.col(path, ref => ref.where(key, '==', value))
      .snapshotChanges()
      .pipe(
        take(1),
        map(items => items.length > 0)
      );
  }

  doc(path: string, id: string): AngularFirestoreDocument<Item> {
    return this.angularFirestore.doc(`${path}/${id}`);
  }

  col(path: string, queryFn?: QueryFn): AngularFirestoreCollection<Item> {
    return this.angularFirestore.collection(path, queryFn);
  }

  colWithIds(path: string, queryFn?: QueryFn): Observable<Item[]> {
    return this.col(path, queryFn).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Item;
          data['id'] = a.payload.doc.id;
          return data;
        });
      })
    );
  }
}
