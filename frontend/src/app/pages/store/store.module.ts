import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoreRoutingModule} from './store-routing.module';
import {OrderComponent} from './catalog/order.component';
import {ProductpageComponent} from './productpage/productpage.component';
import {QRCodeModule} from 'angularx-qrcode';
import {MaterialModule} from '../../shared/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ProductsService} from './shared/products.service';
import {
  MatBadgeModule
} from '@angular/material/badge';
import {
  MatButtonModule
} from '@angular/material/button';
import {PricelistComponent} from './pricelist/pricelist.component';
import {CheckoutModule} from '../checkout/checkout.module';
import {SharedModule} from '../../shared/shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  imports: [

    CommonModule,
    StoreRoutingModule,
    QRCodeModule,
    ReactiveFormsModule,

    MatRadioModule,
    MatCardModule,
    MatStepperModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDividerModule,

    SharedModule,
    CheckoutModule

  ],
  declarations: [OrderComponent, ProductpageComponent, PricelistComponent],
  providers: [ProductsService],
  entryComponents: [PricelistComponent]
})
export class StoreModule {
}
