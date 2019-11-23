import {Injectable} from '@angular/core';
import {FirestoreService} from '../../../core/firebase/store.service';
import {Product} from './product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private fspath = 'Products';

  constructor(private storeservice: FirestoreService<Product>) {
  }

  calculateCheapest(prod: Product): object {
    let cheapest = {
      price: null,
      type: null,
      size: null
    };
    for (const type of Object.values(prod.types)) {
      for (const size of Object.values(type.dimensions)) {
        if (!cheapest.price || size['price'] < cheapest.price) {
          cheapest = {
            price: size['price'],
            type: type.savedas,
            size: size['savedas']
          };
        }
      }
    }
    return cheapest;
  }
}

// this service is currently not used

