import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserheaderComponent } from './userheader/userheader.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { authGuard } from '../guards/auth.guard';
import { MenCollectionsComponent } from './men-collections/men-collections.component';
import { WomenCollectionsComponent } from './women-collections/women-collections.component';
import { ChildrenCollectionsComponent } from './children-collections/children-collections.component';
import { CartPageComponent } from './cart-page/cart-page.component';


const routes: Routes = [
  {path:'', component:UserHomeComponent, canActivate:[authGuard] },
  {path:'register', component:UserRegisterComponent },
  {path:'login', component:UserloginComponent},
  {path:'men', component:MenCollectionsComponent,canActivate:[authGuard]},
  {path:'women', component:WomenCollectionsComponent,canActivate:[authGuard]},
  {path:'children', component:ChildrenCollectionsComponent,canActivate:[authGuard]},
  {path:'cart', component:CartPageComponent,canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
