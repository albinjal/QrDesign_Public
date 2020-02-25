import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../shared/admin.service';
import {FireAuthService} from '../../../core/firebase/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private adminServ: AdminService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.adminServ.adminUser$.subscribe((value => {
      if (value) {
        this.router.navigate(['admin/dashboard']);
      }
    }));
  }

  submit() {
    const v = this.loginForm.value;
    this.login(v.username, v.password);
  }

  login(username: string, password: string) {
    this.adminServ.loginWithEmail(username, password);
  }

  verify() {
    this.adminServ.verifyMail();
  }

}
