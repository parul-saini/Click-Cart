import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminserviceService } from 'src/app/services/admin/adminservice.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent {
  myForm!: FormGroup;
 
  showSuccessMsg : boolean= false;


  constructor(private fb : FormBuilder,private toastr: ToastrService,private router :Router, 
    private http:HttpClient , private adminService:AdminserviceService){
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
     
      },{ validator: this.passmatch });

  }

  passmatch(myForm: FormGroup){
    return myForm.controls['password'].value === myForm.controls['confirmPassword'].value
    ? null : { 'mismatch': true };
  }

  onSubmit():void{
    if(this.myForm.valid){
       // console.log(this.myForm.value);
        // var registeredUser : any = [];
        // registeredUser.push(this.myForm.value)
        // localStorage.setItem("Admin-User",JSON.stringify(registeredUser));
        this.addUserToDataBase(this.myForm.value);
    }else{
      Object.keys(this.myForm.controls).forEach(key => {
        const controlErrors = this.myForm.get(key)?.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log(`Control '${key}' has error '${keyError}' with value '${controlErrors[keyError]}'`);
          });
        }
      });
      console.log("Invalid form");
      this.toastr.error('Error Message', "Invalid form", {
        timeOut: 3000
      });
    }
  }

  
  toggleSuccessMsg(){
    this.showSuccessMsg=!this.showSuccessMsg;
    return this.showSuccessMsg;
  }
  
  showSuccess(message: string ) {
  //  console.log(this.showSuccessMsg,"toggleSuccessMsg",this.toggleSuccessMsg());
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

  
  addUserToDataBase(user:any){
    this.adminService.registerAdmin(user).subscribe(
      response=>{
        this.toastr.success("Success Message",'Registered the Admin successfully!');
        this.router.navigate(['/admin']);
      },
      (error:HttpErrorResponse) =>{
        if(error.status>200 && error.error.message ){
          this.toastr.warning("Error Message",error.error.message);
        }
      }
    )
 } 
}
