import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminserviceService } from 'src/app/services/admin/adminservice.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  myForm : FormGroup;
  

  constructor(private fb : FormBuilder,private authService: AdminserviceService,
    private router: Router,private toastr: ToastrService, private adminservice :AdminserviceService){
     this.myForm = this.fb.group({
      email : ['', [Validators.required, Validators.minLength(3)]],
      password : ['', Validators.required]
     })
     var isAdminLoginAlready = !!localStorage.getItem("Seller-Token");
     if(isAdminLoginAlready)
     {
      // console.log(isAdminLoginAlready);
      this.router.navigate(["/admin/viewSeller"]);
     }
  }

  onSubmit(){
    if(this.myForm.valid){
       //console.log(this.myForm.value);
       this.adminservice.adminlogin(this.myForm.value).subscribe(
           isLogin =>{
             if(isLogin){
               this.toastr.success('Message', "Login SuccessFully:)", {
                 timeOut: 3000
               });
               this.router.navigate(['/admin/viewSeller']);
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
