import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {User} from '../cart.model';
import {loggedIn} from '@angular/fire/auth-guard';
import {OrderResp} from '../../pages/checkout/confirmation/orderResp';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AnalyticsService {
  constructor(
    private _router: Router,
    private _cookie: CookieService
  ) {}

  pageView(overridePath?: string) {
    (<any>window).dataLayer.push({
      event: 'virtualPageview',
      virtualPageURL: overridePath || this._router.url,
      virtualPageTitle: overridePath || this._router.url,
    });
  }
  updateUserData(user: User) {
    if (user) {
      (<any>window).dataLayer.push({
        event: 'userUpdate',
        cartValue: user.nomomsprice,
        cartItems: user.items,
        userID: user.uid
      });
    }
  }
  purchase(data: OrderResp) {
    if (this._cookie.check(data.id)) {
      return null;
    }
    this._cookie.set( data.id, 'true', Date.now() + 1000 * 60 * 60 * 24 * 30);
    (<any>window).dataLayer.push({
      event: 'purchase',
      purConValue: data.amount * 0.5,
      purAmount: data.amount,
      purID: data.id,
      purItems: data.items,
      purTax: data.tax
    });
  }
}
