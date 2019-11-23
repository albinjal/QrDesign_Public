import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../../core/cart.service';
import * as firebase from 'firebase/app';
import {DOCUMENT} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute} from '@angular/router';
import {FireAuthService} from '../../../core/firebase/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  klarnid: string;

  constructor(@Inject(DOCUMENT) document,
              private cartserv: UserService,
              private cookie: CookieService,
              private route: ActivatedRoute,
              private authServ: FireAuthService) {
//    cookie.deleteAll('/');
    route.params.subscribe(params => this.klarnid = params['id']);
    const getorder = firebase.functions().httpsCallable('getwithID');
    getorder({
      id: this.klarnid,
    }).then(value1 => {
      this.authServ.emptyCart();
      cartserv.renderSnippet(value1.data);
    });
  }

  ngOnInit() {
  }

}
