import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GlobalvarsService {
  private _momsSats = 1.25;
  constructor(private cookieserv: CookieService) {
    if (!cookieserv.check('Moms')) {
      cookieserv.set('Moms', JSON.stringify(true));
    }
  }

  set Cookiespol(goal: boolean) {
    this.cookieserv.set('cookies', JSON.stringify(goal));
  }

  get Cookiespol(): boolean {
    if (!this.cookieserv.check('cookies')) {
      return null;
    } else {
      return JSON.parse(this.cookieserv.get('cookies'));
    }
  }

  set Moms(Moms: boolean) {
    this.cookieserv.set('Moms', JSON.stringify(Moms));
  }

  get Moms(): boolean {
    if (!this.cookieserv.check('Moms')) {
      return null;
    } else {
      return JSON.parse(this.cookieserv.get('Moms'));
    }
  }

  get momsSats(): number {
    return this._momsSats;
  }

  get appliedMoms(): number {
    return this.Moms ? this._momsSats : 1;
  }
}
