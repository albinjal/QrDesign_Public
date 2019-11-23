import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NavComponent} from './core/nav/nav.component';


const routes: Routes = [
  {path: 'home', loadChildren: './pages/home/shared/home.module#HomeModule'},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'butik', loadChildren: './pages/store/shared/store.module#StoreModule'},
  {path: 'kassa', loadChildren: './pages/checkout/shared/checkout.module#CheckoutModule'},
  {path: 'info', loadChildren: './pages/subsites/shared/subsites.module#SubsitesModule'},
  {path: 'albinstudiostaveltryckwebbshopp', redirectTo: 'home', pathMatch: 'full'},
  {path: '', component: NavComponent, outlet: 'nav-bar'}
];
const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
  scrollOffset: [0, 60]
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
