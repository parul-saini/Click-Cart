import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { SellerserviceService } from 'src/app/services/seller/sellerservice.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
  TotalAmount:any=0;
  AllUser: any[] = [];

  displayedColumns: string[] = ['productName', 'productCategory','productDescription','imageUrl', 'actualPrice','amount','quantity','actions',];
  dataSource = new MatTableDataSource(this.AllUser);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(private authService: AuthService,private _liveAnnouncer: LiveAnnouncer, private router :Router,private toastr: ToastrService,private loader: NgxUiLoaderService){
      this.getAllCartItems();
  }
   
  getAllCartItems(){
    this.loader.start();
    this.authService.getCartItems()
    .subscribe(
      response=>{
        this.AllUser= response;
        this.dataSource.data = response;
        this.TotalAmount=0;
        this.AllUser.forEach(elem=>{
       //   console.log(elem.amount, " " , elem.quantity);
          this.TotalAmount = (elem.amount* elem.quantity) + this.TotalAmount;
        })
         // Update the shared service
         this.authService.updateCartItems(this.AllUser);
         this.loader.stop();
      },
      error=>{
        this.loader.stop();
        console.log(error);
        this.toastr.error("","Failed To Load The Cart Items Please Try Later");
      }
    )
  }

  announceSortChange(sortState: Sort) {
    // console.log('Sort event:', sortState);
     if (sortState.direction) {
       this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
     } else {
       this._liveAnnouncer.announce('Sorting cleared');
     }
   }
   
  RemoveFromCart(id:any){
   this.authService.RemoveFromCart(id)
   .subscribe(
    (response:any)=>{
      console.log(response);
      this.getAllCartItems();
      this.toastr.success("",response.message);
    },
    error=>{
      this.toastr.error("",error.error.message);
    }
   )
  }

  clearCart(){
    this.loader.start();
    this.authService.ClearCart()
    .subscribe(
      (response:any)=>{
        console.log(response);
        this.getAllCartItems();
        this.toastr.success("",response.message);
        this.loader.stop();
      },
      error=>{
        this.toastr.error("",error.error.message);
        this.loader.stop();
      }
    )
  }
  
}
