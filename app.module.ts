import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderComponent } from './pages/store/order.component';
import {InfoComponent} from './pages/subsites/info/info.component';
import {ContactComponent} from './pages/subsites/contact/contact.component';
import {AdminloginComponent} from './admin/adminlogin/adminlogin.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {FireAuthService} from './core/auth.service';
import {FirestoreService} from './core/store.service';
import {FireStorageService} from './core/storage.service';
import {CookieService} from 'ngx-cookie-service';
import {CoreModule} from './core/core.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {ProductpageComponent} from './pages/store/productpage/productpage.component';
import {HowitworksComponent} from './pages/home/howitworks/howitworks.component';
import { IdeaComponent } from './pages/home/idea/idea.component';
import { OurproductsComponent } from './pages/home/ourproducts/ourproducts.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {QRCodeModule} from 'angularx-qrcode';
import {ProductsService} from './pages/store/products.service';
import {ColorPickerModule} from 'ngx-color-picker';
import {CheckoutComponent} from './pages/checkout/checkout.component';
import {HttpClientModule} from '@angular/common/http';
import {TermsComponent} from './pages/subsites/terms/terms.component';
import {ConfirmationComponent} from './pages/checkout/confirmation/confirmation.component';
import {ValuesPipe} from './shared/values.pipe';
import {FaqComponent} from './pages/subsites/faq/faq.component';
import {DemoComponent} from './pages/home/demo/demo.component';
import {BtoBComponent} from './pages/bto-b/bto-b.component';
import {FirestoreSettingsToken} from '@angular/fire/firestore';
import {RoundPipe} from './shared/round.pipe';
import {CompanyquestionComponent} from './shared/utility/companyquestion/companyquestion.component';

// import {CompanyquestionComponent} from './shared/utility/companyquestion/companyquestion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    OrderComponent,
    InfoComponent,
    ContactComponent,
    AdminloginComponent,
    DashboardComponent,
    ProductpageComponent,
    HowitworksComponent,
    IdeaComponent,
    OurproductsComponent,
    CheckoutComponent,
    TermsComponent,
    ConfirmationComponent,
    ValuesPipe,
    FaqComponent,
    DemoComponent,
    BtoBComponent,
    RoundPipe,
    CompanyquestionComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    CoreModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ColorPickerModule,
    QRCodeModule,
    HttpClientModule
  ],
  providers: [
    FirestoreService,
    FireAuthService,
    FireStorageService,
    CookieService,
    FormBuilder,
    ProductsService,
    {provide: FirestoreSettingsToken, useValue: {}}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    // CompanyquestionComponent
  ]
})
export class AppModule { }
