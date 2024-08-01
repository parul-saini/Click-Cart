
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminserviceService } from 'src/app/services/admin/adminservice.service';
import { SellerserviceService } from 'src/app/services/seller/sellerservice.service';

@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate {

  constructor(private adminService: AdminserviceService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.adminService.isAuthenticatedAdmin()) {
      return true; // Allow access to the route
    } else {
      this.router.navigate(['/admin']); // Redirect to login page if not authenticated
      return false;
    }
  }
}
