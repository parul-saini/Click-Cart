import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
 islogin : any ;

 constructor(private authService: AuthService){
  
 }
//  ngOninit(){
//   this.islogin = this.authService.isAuthenticatedUser();
//   console.log(this.islogin);
//  }

 Logout(){
    this.authService.logout();
  }
}
