import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../../core/store.service';
import {FireStorageService} from '../../core/storage.service';
import {ProductsService} from './products.service';
import {Product} from './product.model';
import {map} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {ContactComponent} from '../subsites/contact/contact.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  products: Array<Product>;
  loading: boolean;


  constructor(private fss: FirestoreService<Product>, private dialog: MatDialog) {
    this.loading = true;
    this.fss.list('Products', ref => ref.where('visable', '==', true).orderBy('popularity', 'desc')).pipe(
      map(value => {
        const finalval = [];
        for (const prod of value) {
          finalval.push(Object.assign(prod, {'imgpath': prod.colors[prod.favoritecolor]['imgpath']}));
        }
        return finalval;
      })
    ).subscribe(value => {
      this.loading = false;
      return this.products = value;
    });
  }

  ngOnInit() {
  }

  custommotive() {
    this.dialog.open(ContactComponent, {maxHeight: 730});
  }
}
