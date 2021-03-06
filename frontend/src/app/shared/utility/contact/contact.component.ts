import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirestoreService} from '../../../core/firebase/store.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {map, share} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  mailform: FormGroup;
  telform: FormGroup;
  isMobile: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    share(),
  );

  constructor(private breakpointObserver: BreakpointObserver,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private fss: FirestoreService<any>,
              public dialogRef: MatDialogRef<ContactComponent>) {
    this.mailform = fb.group({
      'adress': ['', Validators.compose([Validators.required, Validators.email])],
      'subject': ['', Validators.compose([Validators.required, Validators.maxLength(40)])],
      'body': ['', Validators.compose([Validators.required, Validators.maxLength(5000)])]
    });
    this.telform = fb.group({
      'tel': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'name': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      'times': ['', Validators.maxLength(100)],
      'subject': ['', Validators.compose([Validators.required, Validators.maxLength(70)])]
    });
  }

  ngOnInit() {
  }


  submail(form: FormGroup): void {
    const data = {
      'type': 'email',
      'sent': firebase.firestore.FieldValue.serverTimestamp(),
      'subject': form.value['subject'],
      'adress': form.value['adress'],
      'message': form.value['body']
    };
    this.uploadmessage(data);
  }

  subphone(form: FormGroup): void {
    const data = {
      'type': 'tel',
      'number': form.value['tel'],
      'sent': firebase.firestore.FieldValue.serverTimestamp(),
      'subject': form.value['subject'],
      'times': form.value['times'],
      'customername': form.value['name']
    };
    this.uploadmessage(data);
  }

  uploadmessage(data: object): void {
    this.fss.insert('Messages', data).then(value => {
      this.dialogRef.close(true);
      this.snackBar.open('Ditt meddelande har skickats', undefined, {
        duration: 3000,
      });
    }).catch(reason => {
      this.snackBar.open('Något gick snett', undefined, {
        duration: 5000,
      });
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
