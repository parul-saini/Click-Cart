import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-foremail',
  templateUrl: './foremail.component.html',
  styleUrls: ['./foremail.component.scss']
})
export class ForemailComponent {
  myForm : FormGroup;

   constructor(private fb : FormBuilder, private router: Router,private toastr: ToastrService){
      this.myForm= this.fb.group({
        email:['', [Validators.required, Validators.email]],
      })
   }
   
   showerror(){
        this.toastr.error('Error Message',"enter invalid email " , {
          timeOut: 3000
      });
   }

   onSubmit(){
      if(this.myForm.valid){
         this.router.navigate(['/resetpassword']);
      }
      else{
          console.log("Invalid email ");
          this.showerror();
      }
  }
}
