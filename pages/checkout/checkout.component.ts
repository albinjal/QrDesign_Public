import {Component, Inject, OnInit} from '@angular/core';
import {CartService} from '../../core/cart.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as firebase from 'firebase';
import {DOCUMENT} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import {Cart, CartItem} from '../../core/cart.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: Cart;
  cokID: string;
  loading: boolean;
  editing: boolean;
  constructor(@Inject(DOCUMENT) document, private cartserv: CartService, private cookie: CookieService) {
    this.editing = false;
    this.cart = {};
    this.cokID = this.cookie.get('cartid');
    this.loading = true;
    cartserv.currentCart(this.cookie.get('cartid')).subscribe(value => {
      this.cart = value;
      const newOrder = firebase.functions().httpsCallable('newOrder');
      newOrder({
        customer: this.cokID,
        products: this.cart.cart
      }).then(value1 => {
        this.cartserv.renderSnippet(value1.data);
        this.loading = false;
      });
    });
  }

  ngOnInit() {

  }

  changetime() {
    this.editing = true;
  }

  savechanges() {
    this.editing = false;
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  remove(cookieid: string, item: CartItem) {
    this.cartserv.removeitem(cookieid, item);
  }
}


