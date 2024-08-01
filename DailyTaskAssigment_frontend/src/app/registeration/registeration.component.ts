import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegisterationComponent {
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

  constructor(private fb : FormBuilder,private toastr: ToastrService,private router :Router ){
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

  onSubmit():void{
    if(this.myForm.valid){
        console.log(this.myForm.value);
        var registeredUser : any = [];
        registeredUser.push(this.myForm.value)
        localStorage.setItem("Register-User",JSON.stringify(registeredUser));
        this.router.navigate(['/login'])
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
      // setTimeout(()=>{
      //   this.toggleSuccessMsg();
      // },2000) 
    }
   
  }

}
