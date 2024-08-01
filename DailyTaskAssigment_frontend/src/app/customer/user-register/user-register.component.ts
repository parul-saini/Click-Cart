import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
  myForm!: FormGroup;
  selectedCountry:any=null ;
  selectedState:any=null;
  selectedStateForCountry:any= null ;
  countriesWithStates: { [country: string]: string[] } = {
    'India': [  'Andhra Pradesh',
      'Arunachal Pradesh',
      'Assam',
      'Bihar',
      'Chhattisgarh',
      'Goa',
      'Gujarat',
      'Haryana',
      'Himachal Pradesh',
      'Jharkhand',
      'Karnataka',
      'Kerala',
      'Madhya Pradesh',
      'Maharashtra',
      'Manipur',
      'Meghalaya',
      'Mizoram',
      'Nagaland',
      'Odisha',
      'Punjab',
      'Rajasthan',],
    'USA': ['Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        ],
    'UK': ["England", "Scotland", "Wales", "Northern Ireland"]
  };
  showSuccessMsg : boolean= false;

  countryOptions: string[]=["India","USA","UK"];

  constructor(private fb : FormBuilder,private toastr: ToastrService,private router :Router,
    private authservice : AuthService ){
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
        country:['',[Validators.required]],
        state:['', Validators.required]
      },{ validator: this.passmatch });

  }

  passmatch(myForm: FormGroup){
    return myForm.controls['password'].value === myForm.controls['confirmPassword'].value
    ? null : { 'mismatch': true };
  }

  
  ngOnInit(): void{
    
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

  onSubmit():void{
    if(this.myForm.valid){
        this.addUserToDataBase(this.myForm.value);
    }else{
      //to check the exact field where error occur 
      Object.keys(this.myForm.controls).forEach(key => {
        const controlErrors = this.myForm.get(key)?.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log(`Control '${key}' has error '${keyError}' with value '${controlErrors[keyError]}'`);
          });
        }
      });
      this.toastr.error('Error Message', "Invalid form,Please Check Your form again", {
        timeOut: 3000
      });
     // console.log("Invalid form");
    }
  }

  selectCountry(val : string){
    this.myForm.patchValue({ country: val });
    this.selectedCountry = val;
    this.selectedStateForCountry= this.countriesWithStates[val];
  //  console.log(this.selectedStateForCountry);
  }
   
  selectState(state:string){
    this.myForm.patchValue({ state: state });
    this.selectedState= state;
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

  checkPasswordError(): void {
    const passwordControl = this.myForm.get('password');
    if (passwordControl?.hasError('pattern')) {
      this.passwordErrorMessage ='Enter Strong Password' ;
      this.showPasswordMsg('Password must be 8 characters long and include at least one uppercase letter, one special character, and one number.');
    }
  }

  showPasswordMsg(message: string){
    if(message){
      this.toastr.error('Error Message', message, {
        timeOut: 1000
      });
    }
  }

   isAdded: any;
   addUserToDataBase(user:any){
      this.authservice.registerUser(user).subscribe(
        (response:any)=>{
       //  console.log('Registered the customer successfully!', response);
          this.toastr.success("Success Message",'Registered the customer successfully!');
          this.router.navigate(['/login']);
        },
        (error:HttpErrorResponse) =>{
          this.isAdded=false;
         // console.log(error);
          if(error.status>200 && error.error.message ){
            this.toastr.warning("Error Message",error.error.message);
          }
        }
      )
   } 
}
