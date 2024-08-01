import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import { SellerRoutingModule } from './seller-routing.module';
import { AddsellerComponent } from './addseller/addseller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { SellerHeaderComponent } from './seller-header/seller-header.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSortModule} from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';
import { ProductsComponent } from './products/products.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";

@NgModule({
  declarations: [
    AddsellerComponent,
    SellerLoginComponent,
    SellerHeaderComponent,
    AddproductComponent,
    ProductsComponent,
    DeleteConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
    MatTableModule, MatSortModule,
    MatFormFieldModule, MatInputModule, MatIconModule,MatSelectModule,
    MatStepperModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true // Optional: Shows loader on HTTP requests
    })
  ],
 
})
export class SellerModule { }
