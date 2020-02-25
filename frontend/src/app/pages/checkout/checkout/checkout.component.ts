import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../../core/cart.service';
import {DOCUMENT} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import {CartItem, User} from '../../../core/cart.model';
import {AngularFireFunctions} from '@angular/fire/functions';
import {FireAuthService} from '../../../core/firebase/auth.service';
import {GlobalvarsService} from '../../../shared/globalvars.service';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {FunctionsService} from '../../../core/firebase/functions.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  user: User;
  loading = true;
  dCode: FormGroup;
  currentDiscount: number = 1;
  lastCode: string = '';
  waitingForCode: boolean = false;
  discountCode: string;
  delivery: number = 0;


  constructor(
              private userserv: UserService,
              private cookie: CookieService,
              private aff: AngularFireFunctions,
              private authServ: FireAuthService,
              private globs: GlobalvarsService,
              private FB: FormBuilder,
              private funcService: FunctionsService,
              private snackBar: MatSnackBar,
              private router: Router
  ) {
    this.dCode = this.FB.group({'code': ['']});
  }

  ngOnInit() {
    this.authServ.userStream.subscribe(user => {
      if (user) {
        if (user.cart.length > 0) {
          this.userserv.calculateDelivery(user).then(value => this.delivery = value);
          this.user = user;
          this.updateKlarna();
        } else {
          this.router.navigateByUrl('/butik');
        }
      }
    });

  }

  remove(item: CartItem) {
    this.authServ.removeItem(item);
  }
  async checkCode(code: string) {
    if (code && code !== this.lastCode) {
      this.lastCode = code;
      this.waitingForCode = true;
      const discount = await this.funcService.checkDiscount(code);
      this.waitingForCode = false;
      if (discount) {
        this.currentDiscount = 1 - discount;
        this.discountCode = code;
        this.updateKlarna();
        this.openSnackBar(`Grattis! Koden du angav ger dig ${discount * 100}% rabatt.`);
      } else {
        this.openSnackBar('Koden du angav är inte giltig.');
      }
    }
  }
  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 8000,
    });
  }

  async updateKlarna(): Promise<void> {
    this.loading = true;
    const newOrder = this.aff.httpsCallable('newOrder');
    newOrder({...this.user, discountCode: this.discountCode}).toPromise().then(value => {
      this.userserv.renderSnippet(value);
      this.loading = false;
    });
  }

}


