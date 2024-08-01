import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SellerserviceService } from 'src/app/services/seller/sellerservice.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  @Input() items: any[] = [];
  @Input() heading: string = '';
  @Input() backgroundColor: string = '';

  quantity: number = 1;
  constructor(private authservice : AuthService, private toastr: ToastrService,private sellerService:SellerserviceService,
    private router: Router
  ){
    // this.getAllProductsToshow();
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     window.scrollTo(0, 0); // Scroll to the top of the page
    //   }
    // });
  }

  getAllProductsToshow(){
    this.sellerService.GetproductByCategory("men")
    .subscribe(
      response=>{
      //  console.log(response);
      this.items= response;
      },
      error=>{
        console.log(error);
      }
    )
  }
  getAllCartItems(){
    this.authservice.getCartItems()
    .subscribe(
      response=>{
           this.authservice.updateCartItems(response);
      },
      error=>{
        console.log(error);
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
        this.getAllCartItems();
      },
      error=>{
        console.log(error);   
        this.toastr.error(error.statusText, error.error.message);
      }
    )
  }

  DecreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  IncreaseQuantity() {
    this.quantity++;
  }

}
