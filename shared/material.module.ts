import {NgModule} from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatDialogModule,
  MatSidenavModule, MatTabsModule,
  MatStepperModule, MatProgressBarModule, MatBadgeModule, MatSnackBarModule, MatPaginatorModule, MatProgressSpinnerModule
} from '@angular/material';
import {CompanyquestionComponent} from './utility/companyquestion/companyquestion.component';
import {RoundPipe} from './round.pipe';

@NgModule({
  imports: [
    MatProgressSpinnerModule,
    MatButtonModule, MatTabsModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule,
    MatStepperModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  exports: [
    MatProgressSpinnerModule, MatTabsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule,
    MatStepperModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  declarations: []
})
export class MaterialModule {
}
