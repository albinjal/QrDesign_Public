import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../../core/cart.service';
import * as firebase from 'firebase/app';
import {DOCUMENT} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {FireAuthService} from '../../../core/firebase/auth.service';
import {AnalyticsService} from '../../../core/analytics/analytics.service';
import {OrderResp} from './orderResp';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  klarnid: string;

  constructor(@Inject(DOCUMENT) document,
              private cartserv: UserService,
              private route: ActivatedRoute,
              private authServ: FireAuthService,
              private _router: Router,
              private _analytics: AnalyticsService) {
    route.params.subscribe(params => this.klarnid = params['id']);
    const getorder = firebase.functions().httpsCallable('getwithID');
    getorder({
      id: this.klarnid,
    }).then(value => {
      if (value) {
        const resp: OrderResp = value.data;
        this.authServ.emptyCart();
        cartserv.renderSnippet(resp.html);
        this._analytics.purchase(resp);
      } else {
        this._router.navigate(['butik']);
      }
    });
  }

  ngOnInit() {
  }

}
