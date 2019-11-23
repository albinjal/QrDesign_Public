import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoButtonComponent} from './utility/info-button/info-button.component';
import {InfoDialogComponent} from './utility/info-button/info-dialog/info-dialog.component';
import {ContactComponent} from './utility/contact/contact.component';
import {ValuesPipe} from './custom_pipes/values.pipe';
import {MaterialModule} from './material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {ProdFilterPipe} from './custom_pipes/prodfilter.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDividerModule,
  ],
  declarations: [InfoButtonComponent,
    InfoDialogComponent,
    ContactComponent,
    ValuesPipe,
    InfoButtonComponent,
    InfoDialogComponent,
    ProdFilterPipe, ProdFilterPipe
  ],
  exports: [InfoButtonComponent, ProdFilterPipe],
  entryComponents: [ContactComponent, InfoDialogComponent]
})
export class SharedModule {
}
