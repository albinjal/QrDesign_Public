import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject} from 'rxjs';
import {User} from 'firebase';
import {filter, map} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User>(null);
  adminUser$ = this.adminUserSubject.asObservable();
  constructor(private afa: AngularFireAuth, private router: Router) {
    this.afa.authState
      .pipe(map(value => value && value.emailVerified ? value : null))
      .subscribe(value => this.adminUserSubject.next(value));
  }

  loginWithEmail(name: string, pass: string) {
    const n = `${name}@qrdesign.se`;
    this.afa.auth.signInWithEmailAndPassword(n, pass);
  }

  verifyMail() {
    this.adminUser.sendEmailVerification();
  }

  get adminUser() {
    return this.adminUserSubject.value;
  }

  get authenticated(): boolean {
    return this.adminUser !== null;
  }

  signOut() {
    this.afa.auth.signOut().then(
      value => this.router.navigate(['/butik'])
    );
  }

}
