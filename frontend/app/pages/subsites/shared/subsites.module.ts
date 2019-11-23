import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubsitesRoutingModule} from './subsites-routing.module';
import {InfoComponent} from '../info/info.component';
import {ContactComponent} from '../contact/contact.component';
import {TermsComponent} from '../terms/terms.component';
import {FaqComponent} from '../faq/faq.component';

import {SharedModule} from '../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {QrAnswerComponent} from '../qr-answer/qr-answer.component';
import {QRCodeModule} from 'angularx-qrcode';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    SubsitesRoutingModule,
    MatCardModule,
    MatButtonModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTabsModule,
    MatProgressBarModule,
    QRCodeModule,
    MatIconModule
  ],
  declarations: [
    InfoComponent,
    TermsComponent,
    FaqComponent,
    ContactComponent,
    QrAnswerComponent,
  ]
})
export class SubsitesModule {
}
