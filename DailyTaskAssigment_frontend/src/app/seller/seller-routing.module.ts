import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddsellerComponent } from './addseller/addseller.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductsComponent } from './products/products.component';
import { sellerGuard } from '../guards/seller/seller.guard';

const routes: Routes = [
  {path:'', component: SellerLoginComponent},
  {path:'addSeller', component: AddsellerComponent},
  {path:'product', component: ProductsComponent, canActivate:[sellerGuard]},
  {path:'addproduct', component: AddproductComponent,canActivate:[sellerGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
