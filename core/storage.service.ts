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

  private getPath(folder: string, name: string) {
    return `${folder}/${name}`;
  }

  uploadFile(file: File, folder: string, fileName: string): AngularFireUploadTask {
    const filePath = this.getPath(folder, fileName);
    const ref = this.angularFireStorage.ref(filePath);
    return ref.put(file);
  }

  getImgAt(col, name): Observable<string> {
    return this.angularFireStorage.ref(col).child(name).getDownloadURL();
  }
}
