import { Injectable } from '@angular/core';
import {FirestoreService} from '../../../core/firebase/store.service';
import {Product} from '../../store/shared/product.model';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminProdService {
  private readonly path = 'Products';
  constructor(private storeServ: FirestoreService<Product>) {
  }

  listProducts(): Observable<Product[]> {
    return this.storeServ.list(this.path);
  }

  async setProduct(id: string, data: Product) {
    const types = await this.storeServ.get('internalData', 'types').pipe(take(1)).toPromise();
    await this.storeServ.upsert(this.path, id, {...data, ...types});
  }
}
