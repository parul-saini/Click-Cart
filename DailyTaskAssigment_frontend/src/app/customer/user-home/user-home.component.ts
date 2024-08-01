import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SellerserviceService } from 'src/app/services/seller/sellerservice.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent {
  FOOTWEAR : any= [
  ];
  
  constructor(private authservice : AuthService, private sellerService:SellerserviceService){
    this.getAllProductsToshow();
  }

  getAllProductsToshow(){
    this.sellerService.GetAllProducts()
    .subscribe(
      response=>{
      //  console.log(response);
      this.FOOTWEAR= response;
      },
      error=>{
        console.log(error);
      }
    )
  }
}
