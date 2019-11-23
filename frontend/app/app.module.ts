import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FirestoreService} from './core/firebase/store.service';
import {CookieService} from 'ngx-cookie-service';
import {CoreModule} from './core/core.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {FormBuilder} from '@angular/forms';
import {FirestoreSettingsToken} from '@angular/fire/firestore';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from './shared/shared.module';
import { AngularFirePerformanceModule } from '@angular/fire/performance';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    CoreModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    AngularFirePerformanceModule,
    MatButtonModule,
    SharedModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    FirestoreService,
    CookieService,
    FormBuilder,
    {provide: FirestoreSettingsToken, useValue: {}},
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true}
    }
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
