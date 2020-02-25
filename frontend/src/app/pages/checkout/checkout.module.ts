import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CheckoutRoutingModule} from './checkout-routing.module';
import {QRCodeModule} from 'angularx-qrcode';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {RoundPipe} from '../../shared/custom_pipes/round.pipe';
import {SharedModule} from '../../shared/shared.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    QRCodeModule,
    ReactiveFormsModule,
    SharedModule,

    // Material
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,


  ],
  declarations: [ConfirmationComponent, CheckoutComponent, RoundPipe],
  exports: [
    RoundPipe
  ],
})
export class CheckoutModule {
}
