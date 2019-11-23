import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {FirestoreService} from './firebase/store.service';
import {User, CartItem} from './cart.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FunctionsService} from './firebase/functions.service';
import {FireAuthService} from './firebase/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private storeservice: FirestoreService<User>,
              private fs: FunctionsService,
              private authServ: FireAuthService
  ) {
  }

  calculateDelivery(cart: User): Promise<number> {
    return this.fs.calculateDelivery(cart);
  }

  renderSnippet(snippet): any {
    const checkoutContainer = document.getElementById('my-checkout-container');
    if (checkoutContainer) {
      checkoutContainer.innerHTML = snippet;
      const scriptsTags = checkoutContainer.getElementsByTagName('script');
      // This is necessary otherwise the scripts tags are not going to be evaluated
      for (let i = 0; i < scriptsTags.length; i++) {
        const parentNode = scriptsTags[i].parentNode;
        const newScriptTag = document.createElement('script');
        newScriptTag.type = 'text/javascript';
        newScriptTag.text = scriptsTags[i].text;
        parentNode.removeChild(scriptsTags[i]);
        parentNode.appendChild(newScriptTag);
      }
      return snippet;
    }
    return '';
  }

}

