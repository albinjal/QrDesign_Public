import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {CartService} from '../core/cart.service';
import {Observable} from 'rxjs';
import {Cart} from '../core/cart.model';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class GlobalvarsService {
  constructor(private cookieserv: CookieService) {

  }

  setCompany(company: boolean): void {
    this.cookieserv.set('company', JSON.stringify(company));
  }

  get Company(): boolean {
    if (!this.cookieserv.check('company')) {
      return null;
    } else {
      return JSON.parse(this.cookieserv.get('company'));
    }
  }
}
