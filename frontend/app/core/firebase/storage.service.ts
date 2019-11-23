import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(
    private angularFireStorage: AngularFireStorage,
  ) {
  }

  getImgAt(col, name): Observable<string> {
    return this.angularFireStorage.ref(col).child(name).getDownloadURL();
  }
}
