import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {FirestoreService} from '../../core/store.service';
import {Observable} from 'rxjs';
import {Product} from './product.model';
import {map, switchMap, filter, mapTo} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private fspath = 'Products';

  constructor(private storeservice: FirestoreService<Product>) {
  }

}

// this service is currently not used

