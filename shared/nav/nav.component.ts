import { Component, OnInit } from '@angular/core';
import {CartService} from '../../core/cart.service';
import {Cart} from '../../core/cart.model';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  cart: Cart;
  selector: Array<string>;

  constructor(private cartserv: CartService, private router: Router) {
    this.cart = {created: null, cart: [], items: 0};
    // Test ^^
    this.selector = [];
    for (let tab of this.selector) {
      tab = '';
    }
    cartserv.onSiteInit().then(value => value.subscribe(value1 => this.cart = value1));
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      function swaptab(selected: number, selector: Array<string>) {
        selector.forEach((tab, index) => selector[index] = '');
        selector[selected] = 'underline';
      }

      switch (event.urlAfterRedirects) {
        case '/' : {
          swaptab(0, this.selector);
          break;
        }
        case '/butik/produkter' : {
          swaptab(1, this.selector);
          break;
        }
        case '/F%C3%B6r_F%C3%B6retag' : {
          swaptab(2, this.selector);
          break;
        }
        case '/kassa' : {
          swaptab(3, this.selector);
          break;
        }
        default: {
          this.selector.forEach((tab, index) => this.selector[index] = '');
          break;
        }
      }
    });
  }
  ngOnInit() {
  }

  getcolor(range: number): string {
    return this.selector[range];
  }
}
