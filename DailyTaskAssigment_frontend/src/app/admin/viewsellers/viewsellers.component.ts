
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { SellerserviceService } from 'src/app/services/seller/sellerservice.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-viewsellers',
  templateUrl: './viewsellers.component.html',
  styleUrls: ['./viewsellers.component.scss']
})
export class ViewsellersComponent {

  AllUser: any[] = [];
  users: any;

  displayedColumns: string[] = ['fullName', 'email', 'phone','age','gender','actions'];
  dataSource = new MatTableDataSource(this.AllUser);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
 
  constructor(private fb: FormBuilder, private _liveAnnouncer: LiveAnnouncer,
     private sellerService: SellerserviceService,private toastr: ToastrService,private loader: NgxUiLoaderService) {
    
    // const user = localStorage.getItem("user");
    // if (user) {
    //   this.users = JSON.parse(user);
    //   this.AllUser = this.users;
    //   this.dataSource.data = this.AllUser;
    // }
    // console.log("cons", this.AllUser);
  }
  ngOnInit():any{
    this.getSellerDetails();
  }

  getSellerDetails(){
    this.loader.start();
    this.sellerService.getallSellerData().subscribe(
      (response:any)=>{
      //  console.log(response,"allseller");
      this.AllUser = response;
      this.dataSource.data = this.AllUser;
      this.loader.stop();
      },
      (error:any) =>{
        console.log(error);
        this.loader.stop();
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

  AddingAllUserToLocalstorage() {
    localStorage.setItem("user", JSON.stringify(this.AllUser));
  }

  deleteUser(index: number): void {
  //  console.log('Delete user at index', index);
    // this.AllUser.splice(index, 1);
    // this.dataSource.data = this.AllUser;
    // this.AddingAllUserToLocalstorage();
    //------------- dlt from backend
    var sellerToDelete  = this.AllUser[index];
    this.sellerService.DeleteSeller(sellerToDelete.sellerId).subscribe(
        response=>{
          this.toastr.success('', response.message, {
            timeOut: 3000
          });
          this.getSellerDetails();
        },
        error=>{
         // console.log("error",error.error.message);
          this.toastr.error('', error.error.message, {
            timeOut: 3000
          });
        }
    )
  }

  editActiveStatus(index: number){
    // console.log(this.addUserForm.get('ActiveStatus')?.value, index);
    // this.AllUser[index].ActiveStatus = !this.AllUser[index].ActiveStatus;
    // this.AddingAllUserToLocalstorage();
    // from backend
    var sellerToEdit  = this.AllUser[index];
    this.sellerService.editSellerActiveStatus(sellerToEdit.sellerId).subscribe(
      response => {
       // console.log('Seller active status toggled:', response);
        this.toastr.success('Seller active status updated successfully!', 'Success', {
          timeOut: 3000
        });
      },
      error => {
        console.error('There was an error toggling the seller active status!', error);
        this.toastr.error('There was an error updating the seller status', 'Error', {
          timeOut: 3000
        });
      }
    )
  }

}
