import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireFunctionsModule} from '@angular/fire/functions';
import {NavComponent} from './nav/nav.component';
import {FooterComponent} from './footer/footer.component';
import {MaterialModule} from '../shared/material.module';
import {AppRoutingModule} from '../app-routing.module';
import {AngularFireAuthModule} from '@angular/fire/auth';


@NgModule({
  imports: [
    CommonModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    // AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireFunctionsModule,
    MaterialModule,
    AppRoutingModule
  ],
  declarations: [
    NavComponent,
    FooterComponent,
  ],
  exports: [
    NavComponent,
    FooterComponent,
  ],
})
export class CoreModule {
}
