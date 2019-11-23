import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FirestoreService} from '../../../core/firebase/store.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Product} from '../shared/product.model';
import {map} from 'rxjs/operators';
import {PricelistComponent} from '../pricelist/pricelist.component';
import {FunctionsService} from '../../../core/firebase/functions.service';
import {GlobalvarsService} from '../../../shared/globalvars.service';
import {ProductsService} from '../shared/products.service';
import {Subscription} from 'rxjs';
import {InfoDialogComponent} from '../../../shared/utility/info-button/info-dialog/info-dialog.component';
import {DeviceDetectorService} from 'ngx-device-detector';
import {FireAuthService} from '../../../core/firebase/auth.service';
import {CartItem} from '../../../core/cart.model';

export interface OrderFormData {
  color?: string;
  pickLater?: boolean;
  qrtype?: string;
  quantity?: number;
  size?: string;
  type?: string;
  qrCode?: string;
}

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.scss']
})
export class ProductpageComponent implements OnInit, OnDestroy {
  color: string;
  id = '';
  product: Product = {colorarray: [], typearray: [], name: 'Laddar'};
  qrForm: FormGroup;
  pass: boolean = true;
  orderForm: FormGroup;
  qrData = 'WIFI:S:"";T:WPA;P:;;';
  img: string;
  currentprice: number;
  selectedtypearr: string[];
  selectedtype: Object;
  imgload = false;
  currentDiscount = 1;
  amountDiscount = 1;
  currentDCode: string;
  priceInit = false;
  subs: Subscription[];
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  pickLater: boolean = false;

  // imports dependencies
  constructor(private route: ActivatedRoute,
              private fss: FirestoreService<Product>,
              private FB: FormBuilder,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router,
              private functions: FunctionsService,
              private globs: GlobalvarsService,
              private _prodsServ: ProductsService,
              private deviceService: DeviceDetectorService,
              private authServ: FireAuthService
  ) {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();
  }


  ngOnInit() {


    const qrOptions: FormGroup[] = [this.FB.group({
      'SSID': ['', Validators.required],
      'Pass': [''],
      'NetType': ['WPA', Validators.required],
    }),
      this.FB.group({
        'URL': ['', Validators.required],
      }),
    ];

    this.qrForm = this.FB.group({
      qrtype: ['0'],
      pickLater: [false],
      form: qrOptions[0]
    });

    this.orderForm = this.FB.group(
      {
        stepsArray: this.FB.array([
          this.qrForm,
          this.FB.group({
            color: ['', Validators.required]
          }),
          this.FB.group(
            {
              type: ['poster', Validators.required],
              size: ['', Validators.required],
            }
          ),
          this.FB.group({
            quantity: [1, Validators.required]
          })])
      }
    );

    this.subs = [
      this.route.params.subscribe(params => {
        this.stepsArray.get([2]).patchValue({'type': params.type});
        return this.id = params['id'];
      }),
      this.fss.get('Products', this.id).pipe(
        map(product => Object.assign(product, {
          'colorarray': Object.keys(product.colors),
          'typearray': Object.keys(product.types)
        }))
      ).subscribe(value => {
        this.product = value;
        this.stepsArray.get([1]).patchValue({'color': value['favoritecolor']});
        this.img = this.product.colors[value['favoritecolor']]['imgpath'][this.stepsArray.get([2]).value.type];
        if (!this.priceInit) {
          this.stepsArray.get([2]).patchValue(
            {'size': Object.keys(this.product.types[this.stepsArray.get([2]).value['type']].dimensions).sort((a, b) => {
              const comp: object = this.product.types[this.stepsArray.get([2]).value['type']].dimensions;
                if (comp[a].price > comp[b].price) {
                  return 1;
                } else if (comp[a].price < comp[b].price) {
                  return -1;
                } else {
                  return 0;
                }
              })[0]});
          this._reactToPrice(this.stepsArray.get([2]).value);
          this.priceInit = true;
        }
      }),
      this.qrForm.controls.qrtype.valueChanges.subscribe(value => this.qrForm.setControl('form', qrOptions[Number(value)])),

      qrOptions[0].controls['NetType'].valueChanges.subscribe(value => {
        this.pass = value !== 'nopass';
        return qrOptions[0].controls['Pass'].setValue('');
      }),

      this.stepsArray.get([0]).valueChanges.subscribe(value => {
        this.pickLater = value.qrtype === '10';
        switch (value.qrtype) {
          case '0' : {
            let ssid: string = value.form['SSID'];
            let pass: string = value.form['Pass'];
            ssid = ssid.replace(/\\|;|,|:|"/g, x => '\\' + x);
            pass = pass.replace(/\\|;|,|:|"/g, x => '\\' + x);
            this.qrData = 'WIFI:S:' + ssid + ';T:' + value.form['NetType'] + ';P:' + pass + ';;';
            break;
          }
          case '1' : {
            this.qrData = value.form['URL'];
            break;
          }
          case '10':
            this.qrData = 'No Code';
        }

      }),
      this.stepsArray.get([1]).valueChanges.subscribe(value => {
        this.img = this.product.colors[value['color']]['imgpath'][this.stepsArray.get([2]).value.type];
      }),

      this.stepsArray.get([2]).get('type').valueChanges
        .subscribe(value => {
          this.img = this.product.colors[this.stepsArray.get([1]).value.color]['imgpath'][value];
          return this.stepsArray.get([2])
            .patchValue({
              'size': Object.keys(this.product.types[value].dimensions).sort((a, b) => {
                const comp: object = this.product.types[value].dimensions;
                if (comp[a].price > comp[b].price) {
                  return 1;
                } else if (comp[a].price < comp[b].price) {
                  return -1;
                } else {
                  return 0;
                }
              })[0]
            });
        }),

      this.stepsArray.get([2]).valueChanges.subscribe(value => {
        if (this.priceInit) {
          this._reactToPrice(value);
        }
      }),
    ];

  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }



  addToCart(formData: object[]) {
    const data: OrderFormData = {};
    for (const element of formData) {
      Object.assign(data, element);
    }

    this.router.navigateByUrl('/butik');
    // Changes to items also needs to be changed in checkout
    const item: CartItem = {
      'prodID': this.id,
      'type': data.type,
      'size': data.size,
      'color': data.color,
      'quantity': data.quantity,
      'qr_code': this.qrData,
      'prodimg': this.img,
      'prodname': this.product.name,
      'qrType': data.qrtype,
      // Fix this bad structure
      'prodprice': this.currentprice,
      'viewcolor': this.product.colors[data.color].name,
      'viewdim': this.product.types[data.type]['dimensions'][data.size]['name'],
      'pickLater': this.pickLater
    };
    this.authServ.addItemToCart(item);
    this.openSnackBar('Tillagd i Kundvagn', 'Gå till Kassan!');
  }

  private _reactToPrice(value: object) {

    // Array used in ngfor
    this.selectedtypearr = Object.keys(this.product.types[value['type']]['dimensions']);
    this.selectedtype = this.product.types[value['type']]['dimensions'];

    // Sorts with price
    this.selectedtypearr.sort((a, b) => {
      if (this.selectedtype[a].price > this.selectedtype[b].price) {
        return 1;
      } else if (this.selectedtype[a].price < this.selectedtype[b].price) {
        return -1;
      } else {
        return 0;
      }
    });
    this.currentprice = this.selectedtype[value['size']].price;
  }
  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    }).onAction().subscribe(value => this.router.navigateByUrl('/kassa'));
  }

  showPricing(prod: Product) {
    this.dialog.open(PricelistComponent, {data: prod, minWidth: '330px'});
  }

  async checkCode(code: string) {
    console.log(code);
    if (code) {
      const discount = await this.functions.checkDiscount(code);
      if (discount) {
        this.currentDiscount = 1 - discount;
      } else {
        this.openSnackBar('Koden du angav är inte giltig', 'ok');
      }
    }
  }

  get stepsArray(): AbstractControl | null {
    return this.orderForm.get('stepsArray');
  }


}
