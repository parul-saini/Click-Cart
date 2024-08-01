import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { SellerserviceService } from 'src/app/services/seller/sellerservice.service';

@Component({
  selector: 'app-addseller',
  templateUrl: './addseller.component.html',
  styleUrls: ['./addseller.component.scss']
})
export class AddsellerComponent {
  myForm!: FormGroup;
  AllUser: any[] = [];
  users: any;
  showSuccessMsg : boolean= false;

  constructor(private fb : FormBuilder,private toastr: ToastrService,private router :Router, private  sellerService : SellerserviceService ){
      this.myForm = this.fb.group({
        firstName:['',[Validators.required, Validators.minLength(3)]],
        lastName:['',Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        address:['',Validators.required],
        age:['',[Validators.required, Validators.min(1)]],
        gender:['',Validators.required],
        password:['',[Validators.required, Validators.minLength(8), 
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'
        )]],
        confirmPassword:['', Validators.required],
        ActiveStatus:[true],
      
      },{ validator: this.passmatch });

  }

  passmatch(myForm: FormGroup){
    return myForm.controls['password'].value === myForm.controls['confirmPassword'].value
    ? null : { 'mismatch': true };
  }

  onSubmit():void{
    if(this.myForm.valid){
       //console.log(this.myForm.value);
       const newUser = this.myForm.value;

       // Add new user to the array
       this.AllUser.push(this.myForm.value);
 
       // Save updated user list to local storage
       localStorage.setItem("user", JSON.stringify(this.AllUser));
 
       // Also save user separately 
       localStorage.setItem("seller-User", JSON.stringify([newUser]));
      this.addUserToDataBase(this.myForm.value);
    }else{
      console.log("Invalid form");
      this.toastr.error('Error Message', "Invalid form", {
        timeOut: 3000
      });
    }
  }


  showSuccess(message: string ) {
 
     if(!this.showSuccessMsg)
    {
      this.toastr.error('Error Message', message, {
        timeOut: 3000
      });
      this.showSuccessMsg=!this.showSuccessMsg;
   
    }
   
  }

  passwordErrorMessage : string |null = null;
  onPasswordBlur(){
    const passwordControl = this.myForm.get('password');
    const confirmPasswordControl = this.myForm.get('confirmPassword');
    // console.log("blurrevent");
    if (passwordControl?.invalid && passwordControl.touched) {
      this.checkPasswordError();
    } else {
      this.passwordErrorMessage = null;
      this.toastr.success('Success Message', "Valid Password :)", {
        timeOut: 1000
      });
    }    
  }


  checkPasswordError(): void {
    const passwordControl = this.myForm.get('password');
    if (passwordControl?.hasError('pattern')) {
      console.log('error in pattern');
      this.passwordErrorMessage ='Enter Strong Password' ;
      this.toastr.error('Error Message', 'Password must be 8 characters long and include at least one uppercase letter, one special character, and one number.', {
        timeOut: 1000
      });
    }
  }

  // showPasswordMsg(message: string){
  //   if(message){
  //     this.toastr.error('Error Message', message, {
  //       timeOut: 1000
  //     });
  //   }
  // }


   addUserToDataBase(user:any){
      this.sellerService.registerSeller(user).subscribe(
        response=>{
        //  console.log('Registered the customer successfully!', response);
          this.toastr.success("Success Message",'Registered the customer successfully!');
          this.router.navigate(['/seller']);
        },
        (error:HttpErrorResponse) =>{
         // console.log(error);
          if(error.status>200 && error.error.message ){
            this.toastr.warning("Error Message",error.error.message);
          }
        }
      )
   } 

}
