import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderComponent} from '../catalog/order.component';
import {ProductpageComponent} from '../productpage/productpage.component';

const routes: Routes = [
  {path: 'produkter/:type', component: OrderComponent},
  {path: 'produkter', redirectTo: 'produkter/canvas', pathMatch: 'full'},
  {path: 'produkt-detaljer/:id', redirectTo: 'produkt-detaljer/:id/canvas', pathMatch: 'full'},
  {path: 'produkt-detaljer/:id/:type', component: ProductpageComponent},
  {path: '', redirectTo: 'produkter/poster', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {
}
