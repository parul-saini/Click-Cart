import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.scss']
})
export class UserheaderComponent {
  isUserLogin : boolean = false;
  AllUser: any[]=[];
  TotalCartItems= 0;

  constructor(private authService : AuthService){
   this.isUserLogin= !!localStorage.getItem("MyToken");
   this.authService.cartItems$.subscribe(items => {
    this.TotalCartItems = items.length;
  });
  };
   
  ngOnInit():void{
    this.getAllCartItems();
  }

  getAllCartItems(){
    this.authService.getCartItems()
    .subscribe(
      response=>{
        this.AllUser= response;
        this.TotalCartItems= this.AllUser.length;
        //console.log(this.TotalCartItems, this.AllUser);
           // Update the shared service
           this.authService.updateCartItems(this.AllUser);
      },
      error=>{
        console.log(error);
      }
    )
  }

  onLogout(){
  //  console.log("log out");
    this.authService.logout();
  }
}
