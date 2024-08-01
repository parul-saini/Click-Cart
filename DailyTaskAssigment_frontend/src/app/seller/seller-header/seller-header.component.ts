import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SellerserviceService } from 'src/app/services/seller/sellerservice.service';

@Component({
  selector: 'app-seller-header',
  templateUrl: './seller-header.component.html',
  styleUrls: ['./seller-header.component.scss']
})
export class SellerHeaderComponent {
  sellerUser :any;
  isSellerLogin : boolean = false;
  editMode: boolean = false; // use to show edit form 
  sellerForm!: FormGroup;
  
  constructor(private authService: SellerserviceService,private fb: FormBuilder,private toastr: ToastrService){
    this.isSellerLogin= !!localStorage.getItem("Seller-Token");
    this.getSellerData();
  }

  ngOnInit(): void {
    this.sellerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(1)]],
      gender: ['', [Validators.required]],
      activeStatus:[],
      password:['',]
    });
  }
  
  getSellerData(){
    this.authService.getSellerDetails().subscribe(
      response=>{
        //  console.log(response);
          this.sellerUser= response;
      },
      error=>{
        console.log(error);  
      }
    );
  }

  onLogout(){
    this.authService.logout();
  }


  onEditDetails(){
    // console.log("form on edit ",this.sellerUser);
    this.sellerForm.patchValue({
      firstName: this.sellerUser.firstName,
      lastName: this.sellerUser.lastName,
      email: this.sellerUser.email,
      phone: this.sellerUser.phone,
      address: this.sellerUser.address,
      age: this.sellerUser.age,
      gender: this.sellerUser.gender,
      activeStatus : this.sellerUser.activeStatus,
      password:this.sellerUser.password,
    });
    this.editMode = !this.editMode;
    // console.log("on edit");
  }

  onSubmit(){
    // console.log("submit",this.sellerForm.value);
    if(this.sellerForm.valid){
      this.authService.updateSellerDetails(this.sellerForm.value)
      .subscribe(
        (response:any) => {
          this.toastr.success("Success Message",'Updated the seller successfully!');
          this.editMode = false;
          this.getSellerData();
        },
       ( error:any) => {
          this.toastr.error("",'Failed to Update the seller !');
          this.editMode = false;
        }
      );
    }
  }



}
