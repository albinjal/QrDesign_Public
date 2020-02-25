import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FireStorageService} from '../../../../core/firebase/storage.service';
import {AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {UploadTaskSnapshot} from '@angular/fire/storage/interfaces';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input() uploadPath: string;
  @Output() downloadURL = new EventEmitter<string>();
  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<UploadTaskSnapshot>;

  isHovering: boolean;

  constructor(private storageService: FireStorageService) { }


  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  startUpload(event: FileList) {
    const file = event.item(0);

    if (file.type !== 'image/jpeg') {
      console.error('unsupported file type :( ');
      return;
    }


    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storageService.uploadFile(file, this.uploadPath);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();

    // The file's download URL
    this.task.then(async (value) => this.downloadURL.emit( await value.ref.getDownloadURL()));
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
