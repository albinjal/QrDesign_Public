import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './shared/admin-routing.module';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AdminDashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './shared/auth.guard';
import {ProductsComponent} from './products/products.component';
import { NewProdComponent } from './products/new-prod/new-prod.component';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { DropZoneDirective } from './shared/file-upload/drop-zone.directive';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';
import { FileSizePipe } from './shared/file-upload/file-size.pipe';
import { TypesAdminComponent } from './products/types-admin/types-admin.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    AngularFireAuthModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  declarations: [
    LoginComponent,
    AdminDashboardComponent,
    ProductsComponent,
    NewProdComponent,
    DropZoneDirective,
    FileUploadComponent,
    FileSizePipe,
    TypesAdminComponent,

  ],
  providers: [
    AuthGuard
  ]
})
export class AdminModule { }
