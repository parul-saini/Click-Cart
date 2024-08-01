// src/app/auth/seller.guard.ts

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerserviceService } from 'src/app/services/seller/sellerservice.service';

@Injectable({
  providedIn: 'root'
})
export class sellerGuard  implements CanActivate {

  constructor(private sellerService: SellerserviceService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.sellerService.isAuthenticatedSeller()) {
      return true; // Allow access to the route
    } else {
      this.router.navigate(['/seller']); // Redirect to login page if not authenticated
      return false;
    }
  }
}
