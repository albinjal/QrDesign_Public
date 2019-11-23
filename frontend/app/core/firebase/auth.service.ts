import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {first, map, mergeMap, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs/index';
import {CartItem, User} from '../cart.model';
import {FirestoreService} from './store.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  private readonly path = 'Users';

  private user$: Observable<User | null>;
  private user: User | null;

  constructor(
    private af: AngularFireAuth,
    private afs: FirestoreService<User>
  ) {
    this.user$ = this.af.authState.pipe(
      // empty array does the job
      switchMap((user) => user ? this.afs.get(this.path, user.uid) : []),
      map(v => v ? this.userPipe(v) : null)
    );
    this.user$.subscribe(user => this.user = user);
  }

  get userStream(): Observable<User | null> {
    return this.user$;
  }

  get lastUser(): User | null {
    return this.user;
  }


  async anonymousLogin() {
    const fireUser = await this.af.auth.signInAnonymously();
    await this.updateUserDoc(fireUser.user.uid);
  }

  private userPipe(user: User): User {
    user.items = 0;
    user.totalmomsprice = 0;
    user.totalmoms = 0;
    user.nomomsprice = 0;
    const cartItems = user.cart;
    for (const item of cartItems) {

      item.nomomsprice = item.quantity * item.prodprice / 100;
      item.momsprice = item.quantity * item.prodprice * 1.25 / 100;
      item.singleprice = item.prodprice * 1.25 / 100;
      item.itemmoms = item.nomomsprice * 0.25;
      user.totalmomsprice += item.momsprice;
      user.nomomsprice += item.nomomsprice;
      user.totalmoms += item.itemmoms;
      user.items += item.quantity;
    }

    user.totalmoms = Math.round(user.totalmoms);
    user.nomomsprice = Math.round(user.nomomsprice);
    return user;
  }


  private async updateUserDoc(uid: string) {
    return this.afs.create(this.path, uid, {
      cart: [],
      created: firebase.firestore.FieldValue.serverTimestamp(),
      uid: uid
    });
  }

  addItemToCart(item: CartItem): Promise<User> {
    // @ts-ignore
    return this.afs.update(this.path, this.lastUser.uid, {'cart': firebase.firestore.FieldValue.arrayUnion(item)});
  }

  removeItem(item: CartItem) {
    this.afs.update(this.path, this.lastUser.uid, {
      // @ts-ignore
      cart: firebase.firestore.FieldValue.arrayRemove({
        'prodID': item.prodID,
        'type': item.type,
        'size': item.size,
        'color': item.color,
        'quantity': item.quantity,
        'qr_code': item.qr_code,
        'prodimg': item.prodimg,
        'prodname': item.prodname,
        'prodprice': item.prodprice,
        'viewcolor': item.viewcolor,
        'viewdim': item.viewdim,
        'pickLater': item.pickLater,
        'qrType': item.qrType,
      })
    });
  }

  async emptyCart() {
    return this.afs.update(this.path, this.lastUser.uid, {cart: []});
  }
}
