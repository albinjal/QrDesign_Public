import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {FireAuthService} from '../firebase/auth.service';
import {User} from '../cart.model';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  cart: User | null;
  selector: Array<string>;


  constructor(private router: Router,
              private authServ: FireAuthService) {
    this.selector = [];
    for (let tab of this.selector) {
      tab = '';
    }


    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        const s = event.urlAfterRedirects;
        if (s.charAt(1) === '#') {
          event.urlAfterRedirects = '/home';
          return event;
        }
        if (s.substr(1, 5) === 'kassa') {
          event.urlAfterRedirects = '/kassa';
          return event;
        }
        if (s.substr(1, 5) === 'butik') {
          event.urlAfterRedirects = '/butik';
          return event;
        }
        return event;
      })
    ).subscribe((event: NavigationEnd) => {
      function swaptab(selected: number, selector: Array<string>) {
        selector.forEach((tab, index) => selector[index] = '');
        selector[selected] = 'underline';
      }

      switch (event.urlAfterRedirects) {
        case '/home' : {
          swaptab(0, this.selector);
          break;
        }
        case '/butik' : {
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

  ngOnInit(): void {
    this.authServ.userStream.subscribe(u => this.cart = u);
  }

  getcolor(range: number): string {
    return this.selector[range];
  }
}
