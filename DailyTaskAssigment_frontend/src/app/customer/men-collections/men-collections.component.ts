import { Component } from '@angular/core';
import { ExtraOptions, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/services/auth.service';
import { SellerserviceService } from 'src/app/services/seller/sellerservice.service';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled', // enables scrolling to top
  anchorScrolling: 'enabled', // enables anchor scrolling
};

@Component({
  selector: 'app-men-collections',
  templateUrl: './men-collections.component.html',
  styleUrls: ['./men-collections.component.scss']
})
export class MenCollectionsComponent {
  FOOTWEAR : any= [];
  quantity: any =1 ;
  heading:any;
  
  constructor(private authservice : AuthService, private toastr: ToastrService,private sellerService:SellerserviceService,private loader: NgxUiLoaderService,
    private router: Router
  ){
    this.getAllProductsToshow();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Scroll to the top of the page
      }
    });
  }

  getAllProductsToshow(){
    this.loader.start();
    this.sellerService.GetproductByCategory("men")
    .subscribe(
      response=>{
      //  console.log(response);
      this.FOOTWEAR= response;
      this.loader.stop();
      },
      error=>{
        console.log(error);
        this.loader.stop();
      }
    )
  }

  AddToCart(id:any){
    var item ={
        "productId": id,
        "orderQuantity": this.quantity
    }
    this.authservice.addToCartItem(item).subscribe(
      res=>{
        this.toastr.success("Success Message",'Added To Cart!');;
      },
      error=>{
        console.log(error);   
        this.toastr.error(error.statusText, error.error.message);
      }
    )
  }
  

}
