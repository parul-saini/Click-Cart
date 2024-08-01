import { Component } from '@angular/core';
import { AdminserviceService } from 'src/app/services/admin/adminservice.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {
  isAdminLogin:boolean = false;

  constructor(private adminservice:AdminserviceService){
    this.isAdminLogin = !!localStorage.getItem("Admin-Token");
  }

  Onlogout(){
     this.adminservice.logout();
  }
}
