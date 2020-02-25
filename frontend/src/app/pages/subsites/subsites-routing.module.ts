import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InfoComponent} from './info/info.component';
import {TermsComponent} from './terms/terms.component';
import {FaqComponent} from './faq/faq.component';
import {ContactComponent} from './contact/contact.component';
import {QrAnswerComponent} from './qr-answer/qr-answer.component';

const routes: Routes = [
  {path: '', component: InfoComponent},
  {path: 'legalt', component: TermsComponent},
  {path: 'Vanliga_Frågor', component: FaqComponent},
  {path: 'Kontakt', component: ContactComponent},
  {path: 'Ange-QR-Kod/:id', component: QrAnswerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubsitesRoutingModule {
}
