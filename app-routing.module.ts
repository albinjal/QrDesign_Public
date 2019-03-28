import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {OrderComponent} from './pages/store/order.component';
import {InfoComponent} from './pages/subsites/info/info.component';
import {ContactComponent} from './pages/subsites/contact/contact.component';
import {AdminloginComponent} from './admin/adminlogin/adminlogin.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {ProductpageComponent} from './pages/store/productpage/productpage.component';
import {NavComponent} from './shared/nav/nav.component';
import {CheckoutComponent} from './pages/checkout/checkout.component';
import {ConfirmationComponent} from './pages/checkout/confirmation/confirmation.component';
import {TermsComponent} from './pages/subsites/terms/terms.component';
import {FaqComponent} from './pages/subsites/faq/faq.component';
import {BtoBComponent} from './pages/bto-b/bto-b.component';

const routes: Routes = [{path: '', component: HomeComponent},
  {
    path: 'butik', children: [
      {path: 'produkter', component: OrderComponent},
      {path: 'produkt-detaljer/:id', component: ProductpageComponent},
      {path: '', redirectTo: 'produkter', pathMatch: 'full'}
    ]
  },
  {path: 'information', component: InfoComponent},
  {path: 'kontakt', component: ContactComponent},
  {path: 'kassa', component: CheckoutComponent},
  {path: 'konfirmation/:id', component: ConfirmationComponent},
  {path: 'legalt', component: TermsComponent},
  {path: 'Vanliga_Frågor', component: FaqComponent},
  {path: 'För_Företag', component: BtoBComponent},
  {path: 'albinstudiostaveltryckwebbshopp', redirectTo: '', pathMatch: 'full'},
  {
    path: 'admin', children: [
      {path: 'login', component: AdminloginComponent},
      {path: 'dashboard', component: DashboardComponent},
    ]
  }, {path: '', component: NavComponent, outlet: 'nav-bar'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
