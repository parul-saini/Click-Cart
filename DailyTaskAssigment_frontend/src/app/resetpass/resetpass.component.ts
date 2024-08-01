import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.scss']
})
export class ResetpassComponent {
  resetPasswordForm: FormGroup;
  hardcodedOTP: string = '123456'; 
  
  constructor(private fb: FormBuilder,private router:Router,private toastr: ToastrService) {
    this.resetPasswordForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['',[Validators.required, Validators.minLength(8), 
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'
      )]],
      confirmPassword: ['', Validators.required]
    },{validator: this.passMatch });
  }

  passMatch(resetPasswordForm: FormGroup){
  return ( resetPasswordForm.controls['newPassword'].value === resetPasswordForm.controls['confirmPassword'].value ? null : {'mismatch':true} );
  }
  

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      console.log("form");
      const { otp, newPassword, confirmPassword } = this.resetPasswordForm.value;
      if (otp !== this.hardcodedOTP) {
        alert('Invalid OTP');
        return;
      }
      if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      this.resetPasswordForm.reset();
      alert('Password has been reset successfully');
       this.router.navigate(['/login']);
    }else{
      console.log("invalid form");
    }
  }
   
  toggle:boolean = true;

  showError(){
    if(this.toggle)
    this.toastr.error('Error Message',"Password doesn't match with ConfirmPassword", {
      timeOut: 3000
    });
    this.toggle= !this.toggle;
  }

}