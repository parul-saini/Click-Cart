import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { ForemailComponent } from './foremail/foremail.component';


const routes: Routes = [
  // { path: 'resetpassword', component: ResetpassComponent },
  // { path: 'email', component: ForemailComponent},
  // { path: 'manageuser', loadChildren : ()=>import("../app/super-admin/super-admin.module").then(m => m.SuperAdminModule)},
  { path: '', loadChildren : ()=>import("../app/customer/customer.module").then(m => m.CustomerModule)},
  { path: 'seller', loadChildren : ()=>import("../app/seller/seller.module").then(m => m.SellerModule)},
  { path: 'admin', loadChildren : ()=>import("../app/admin/admin.module").then(m => m.AdminModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
