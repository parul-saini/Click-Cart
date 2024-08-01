
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SellerserviceService } from '../services/seller/sellerservice.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private authService: AuthService,private sellerService:SellerserviceService, private router: Router,private toastr: ToastrService) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticatedUser()) {
      // this.toastr.warning('Error Message', "Already Loggedin", {
      //   timeOut: 3000
      // });
      return true; // Allow access to the route
    } else {
      this.router.navigate(['/login']); // Redirect to login page if not authenticated
      return false;
    }
   
  }
}
