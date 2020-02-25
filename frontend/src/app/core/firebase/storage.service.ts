import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
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

  uploadFile(file: File, path: string): AngularFireUploadTask {
    const ref = this.angularFireStorage.ref(path);
    return ref.put(file);
  }

  deleteFile(downloadUrl: string) {
    return this.angularFireStorage.storage.refFromURL(downloadUrl).delete();
  }
}
