import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireFunctionsModule} from '@angular/fire/functions';
import {NavComponent} from './nav/nav.component';
import {FooterComponent} from './footer/footer.component';
import {MaterialModule} from '../shared/material.module';
import {AppRoutingModule} from '../app-routing.module';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AnalyticsService} from './analytics/analytics.service';
import {FireStorageService} from './firebase/storage.service';
import {AngularFireStorage} from '@angular/fire/storage';


@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [
    AnalyticsService,
    AngularFireStorage
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
