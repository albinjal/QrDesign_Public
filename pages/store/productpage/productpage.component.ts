import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FireStorageService} from '../../../core/storage.service';
import {FirestoreService} from '../../../core/store.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../../../core/cart.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Product} from '../product.model';

import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent implements OnInit {
  color: string;
  id = '';
  product: Product;
  orderForm: FormGroup;
  wifiform: FormGroup;
  qrtype = 'wifi';
  qrData = 'WIFI:S:"";T:WPA;P:;;';
  img: string;
  currentprice: number;
  selectedtypearr: Array<string>;
  selectedtype: Object;
  imgload: boolean;

  // imports dependencies
  constructor(private route: ActivatedRoute,
              private storage: FireStorageService,
              private fss: FirestoreService<Product>,
              private formbuilder: FormBuilder,
              private cart: CartService,
              private dialog: MatDialog,
              private cartserv: CartService,
              private snackBar: MatSnackBar,
              private router: Router
  ) {
    this.imgload = false;
    // defines a preload product
    this.product = {
      name: 'Laddar',
      colors: {},
      favoritecolor: 'black',
      types: {},
      typearray: [],
      colorarray: []
    };
    // test ^
    this.route.params.subscribe(params => this.id = params['id']);
    this.orderForm = formbuilder.group(
      {
        'quantity': [1, Validators.required],
        'color': ['pink', Validators.required],
        'type': ['canvas', Validators.required],
        'size': ['', Validators.required],
        'customcolor': ['#4A235A', Validators.required]
        ,
      }
    );
    this.wifiform = formbuilder.group({
      'SSID': ['', Validators.required],
      'Pass': [''],
      'NetType': ['WPA', Validators.required],
    });
  }
  ngOnInit() {
    this.fss.get('Products', this.id).pipe(
      map(value => Object.assign(value, {'colorarray': Object.keys(value.colors), 'typearray': Object.keys(value.types)}))
    ).subscribe(value => {
      this.product = value;
      this.orderForm.patchValue({'color': value['favoritecolor']});
    });
    this.wifiform.controls['NetType'].valueChanges.subscribe(value => this.wifiform.controls['Pass'].setValue(''));
    this.wifiform.valueChanges.subscribe(value => {
      this.qrData = 'WIFI:S:' + value['SSID'] + ';T:' + value['NetType'] + ';P:' + value['Pass'] + ';;';
    });
    this.orderForm.valueChanges.subscribe(value => {
      this.img = this.product.colors[value['color']]['imgpath'];
      if (this.orderForm.value['size'] === '') {
        this.currentprice = 0;
      } else {
        this.currentprice = this.selectedtype[this.orderForm.value['size']]['price'];
      }
    });
    this.orderForm.valueChanges.subscribe(value => {
      this.selectedtypearr = Object.keys(this.product.types[value['type']]['dimensions']);
      this.selectedtype = this.product.types[value['type']]['dimensions'];
    });
    this.orderForm.get(['type']).valueChanges.subscribe(value => this.orderForm.patchValue({'size': ''}));
  }
  addToCart(form: FormGroup) {
    this.router.navigateByUrl('/butik');
    const formdata = form.value;
    const item = {
      'prodID': this.id, 'type': formdata['type'], 'size': formdata['size'],
      'color': formdata['color'], 'quantity': formdata['quantity'], 'qr_code': this.qrData, 'prodimg': this.img,
      'prodname': this.product.name, 'prodprice': this.currentprice, 'viewcolor': this.product.colors[formdata['color']]['name'],
      'viewdim': this.product.types[formdata['type']]['dimensions'][formdata['size']]['name']
    };
    this.cartserv.addItemToCart(item);
    this.openSnackBar('Tillagd i Kundvagn', 'Gå till Kassan!');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    }).onAction().subscribe(value => this.router.navigateByUrl('/kassa'));
  }

  imgloaded() {
    console.log('go');
    this.imgload = true;
  }

}
