import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PitchComponent} from './pitch/pitch.component';

const routes: Routes = [{path: '', component: PitchComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
