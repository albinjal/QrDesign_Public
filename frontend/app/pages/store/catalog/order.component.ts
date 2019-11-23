import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirestoreService} from '../../../core/firebase/store.service';
import {Product} from '../shared/product.model';
import {map} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {ContactComponent} from '../../../shared/utility/contact/contact.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {loggedIn} from '@angular/fire/auth-guard';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  products: Product[];
  currentlyShowing: Product[];
  loading = true;
  sortForm: FormGroup;



  constructor(private fss: FirestoreService<Product>,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router
              ) {
    this.sortForm = this.fb.group({
      'nameFilter': [''],
      'category': ['all'],
      'type': ['canvas'],
      'sorting': ['popularity']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.sortForm.controls.type.setValue(params['type']));
    this.sortForm.controls.type.valueChanges.subscribe(value => this.router.navigateByUrl('/butik/produkter/' + value));


    this.fss.list('Products', ref => ref.where('visable', '==', true).orderBy('popularity', 'desc'))
      .subscribe(value => {
      this.loading = false;
      this.currentlyShowing = value;
      return this.products = value;
    });
  }

  ngOnDestroy(): void {
  }

  custommotive() {
    this.dialog.open(ContactComponent, {maxHeight: 730});
  }

  filter(filter: string): void {
    this.currentlyShowing = this.products.filter(value => value.name.toLowerCase().includes(filter.toLowerCase()));
  }

  subToSorted(sort) {
    console.log(sort);
  }

}
