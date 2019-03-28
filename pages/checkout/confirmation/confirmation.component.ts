import {Component, Inject, OnInit} from '@angular/core';
import {CartService} from '../../../core/cart.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as firebase from 'firebase';
import {DOCUMENT} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import {Cart} from '../../../core/cart.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  klarnid: string;

  constructor(@Inject(DOCUMENT) document, private cartserv: CartService, private cookie: CookieService, private route: ActivatedRoute) {
    cookie.deleteAll('/');
    route.params.subscribe(params => this.klarnid = params['id']);
    const getorder = firebase.functions().httpsCallable('getwithID');
    getorder({
      id: this.klarnid,
    }).then(value1 => {
      cartserv.renderSnippet(value1.data);
    });
  }

  ngOnInit() {
  }

}
