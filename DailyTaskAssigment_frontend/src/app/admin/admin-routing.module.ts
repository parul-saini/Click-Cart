import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewsellersComponent } from './viewsellers/viewsellers.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { adminGuard } from '../guards/admin/admin.guard';

const routes: Routes = [
  {
    path:'', component: AdminLoginComponent
  },
  {
    path:'newadmin', component: AdminRegisterComponent
  },
  {
    path:'viewSeller', component: ViewsellersComponent, canActivate:[adminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
