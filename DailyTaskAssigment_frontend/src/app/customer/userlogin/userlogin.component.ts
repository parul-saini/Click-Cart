import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent {
  myForm : FormGroup;

  constructor(private fb : FormBuilder,private toastr: ToastrService,private authService: AuthService,
    private router: Router){
     this.myForm = this.fb.group({
      email : ['', [Validators.required, Validators.minLength(3)]],
      password : ['', Validators.required]
     })
  }

  ngOnInit(){
    // this.getData();
  }
  // if(this.authService.login(this.myForm.value))
  //   { console.log(this.myForm.value);
  //      this.router.navigate(['/']);
  //   }else{
  //     this.toastr.error('Error Message', "Invalid Credential!", {
  //       timeOut: 3000
  //     });
  //   }

  onSubmit(){
   if(this.myForm.valid){
      //console.log(this.myForm.value);
      this.authService.login(this.myForm.value).subscribe(
          isLogin =>{
            if(isLogin){
              this.toastr.success('Message', "Login SuccessFully:)", {
                timeOut: 3000
              });
              this.router.navigate(['/']);
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

  // getData() {
  //   this.authService.getData().subscribe(
  //     response => {
  //       console.log(response);
  //     },
  //     error => {
  //       console.error('There was an error!', error);
  //     }
  //   );
  // }
}
