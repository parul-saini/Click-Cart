import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { UserheaderComponent } from './userheader/userheader.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import { MenCollectionsComponent } from './men-collections/men-collections.component';
import { WomenCollectionsComponent } from './women-collections/women-collections.component';
import { ChildrenCollectionsComponent } from './children-collections/children-collections.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { MatSortModule} from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";

@NgModule({
  declarations: [
    UserheaderComponent,
    UserloginComponent,
    UserRegisterComponent,
    UserHomeComponent,
    MenCollectionsComponent,
    WomenCollectionsComponent,
    ChildrenCollectionsComponent,
    CartPageComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatBadgeModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    SharedModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true // Optional: Shows loader on HTTP requests
    })
  ]
})
export class CustomerModule { }
