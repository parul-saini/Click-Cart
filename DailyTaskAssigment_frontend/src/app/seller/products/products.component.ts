import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SellerserviceService } from 'src/app/services/seller/sellerservice.service';
import {ChangeDetectionStrategy, inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  readonly dialog = inject(MatDialog);

  AllUser: any[] = [];
  users: any;
  sellerActtivestatus:any;

  displayedColumns: string[] = ['productName', 'productCategory','productDescription','imageUrl', 'amount','quantity','rating','actions',];
  dataSource = new MatTableDataSource(this.AllUser);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllProductsToshow(){
    this.loader.start();
    this.sellerService.GetAllProducts()
    .subscribe(
      response=>{
      //  console.log(response);
        this.AllUser= response;
        this.dataSource.data = response;
        this.loader.stop();
      },
      error=>{
        console.log(error);
        this.loader.stop();
        this.toastr.error('Error Message', error.error.message, {
          timeOut: 1000
        });
      }
    )
  }

  constructor(private _liveAnnouncer: LiveAnnouncer, private router :Router,private sellerService:SellerserviceService,private toastr: ToastrService,private loader: NgxUiLoaderService){
    this.getAllProductsToshow();
    //to give access to add product or not
    this.sellerService.getSellerDetails().subscribe(
      res=>{
        this.sellerActtivestatus=res.activeStatus;
     //   console.log(this.sellerActtivestatus);
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

   editProduct(i:any){
      // console.log(i);
      this.router.navigate(['/seller/addproduct'], { queryParams: { prodId: i } });
    }
   
   
  deleteProduct(i:any){
    // console.log(i);
    this.sellerService.deleteProduct(i)
    .subscribe(
      (response:any)=>{
        // console.log(response);
        this.getAllProductsToshow();
        this.toastr.success('Success Message',response.message, {
          timeOut: 1000
        });
      },
      error=>{
       this.toastr.error('Error Message', error.error.message, {
        timeOut: 1000
      });
      }
    )
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,pId:any): void {
    this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '280px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(result => {
      if (result) {  // If the user confirmed
        // Handle the confirmation action here
        this.deleteProduct(pId); // Provide the actual productId or implement logic
      }
    });
  }
}
