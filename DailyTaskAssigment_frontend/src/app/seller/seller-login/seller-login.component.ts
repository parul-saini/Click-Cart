import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SellerserviceService } from 'src/app/services/seller/sellerservice.service';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.scss']
})
export class SellerLoginComponent {
  myForm : FormGroup;

  constructor(private fb : FormBuilder,private authService: SellerserviceService,
    private router: Router,private toastr: ToastrService){
     this.myForm = this.fb.group({
      email : ['', [Validators.required, Validators.minLength(3)]],
      password : ['', Validators.required]
     })
     var isSellerLoginAlready = !!localStorage.getItem("Seller-Token");
     if(isSellerLoginAlready)
     {
      this.router.navigate(["/seller/product"]);
     }
  }

  onSubmit(){
    if(this.myForm.valid){
       //console.log(this.myForm.value);
       this.authService.sellerlogin(this.myForm.value).subscribe(
           isLogin =>{
             if(isLogin){
               this.toastr.success('Message', "Login SuccessFully:)", {
                 timeOut: 3000
               });
               this.router.navigate(['/seller/product']);
             }else{
               this.toastr.error('Error Message', "Invalid email or password", {
                  timeOut: 3000
                });
             }
           },
           (error) =>{
              console.log("An error occurred");
           }
       );    
    }else{
       //  console.log("Form is invalid");
        this.myForm.markAllAsTouched();
        this.toastr.warning('Error Message', "Invalid form", {
         timeOut: 3000
       });
    }
   }
}
