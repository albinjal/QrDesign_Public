import {Component, OnInit} from '@angular/core';
import {MailChimpService} from '../../../core/mailchimp/mailchimp.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-mail-signup',
  templateUrl: './mail-signup.component.html',
  styleUrls: ['./mail-signup.component.scss']
})
export class MailSignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private chimpService: MailChimpService,
    private fb: FormBuilder
  ) {
    this.signUpForm = fb.group({
      email_address: new FormControl('', [Validators.email, Validators.required])

    });
  }

  ngOnInit() {
  }

  signUp() {
    this.chimpService.addMember(this.signUpForm.value);
  }

}
