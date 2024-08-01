import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SellerserviceService } from 'src/app/services/seller/sellerservice.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  addProductForm: FormGroup;
  productInfo: FormGroup;
  ProductObj: any;
  allProducts: any = [];
  productIdToEdit: any;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, 
    private sellerService:SellerserviceService,private toastr: ToastrService) {
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required],
      imageUrl: ['', [Validators.required,Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
      ]],
      productDescription: ['', Validators.required],
      productCategory: ['', Validators.required],
    });
    this.productInfo = this.fb.group({
      amount: ['', Validators.required],
      quantity: ['', Validators.required],
      rating: [0,Validators.required]
    });

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.productIdToEdit = params['prodId'];
      if (this.productIdToEdit) {
          this.sellerService.GetproductById(this.productIdToEdit)
          .subscribe(
            response=>{

              // Add the pId form control during edit 
              this.addProductForm.addControl('pId', new FormControl(''));
              this.addProductForm.patchValue({
                productName: response.productName,
                imageUrl: response.imageUrl,
                productDescription: response.productDescription,
                productCategory: response.productCategory,
                pId: response.pId 
              });
              this.productInfo.patchValue({
                amount: response.amount,
                quantity: response.quantity,
                rating : response.rating,
              });
            },
            error=>{
              console.log(error);
            }
          )
      }
    });
  }
  

  onSubmit() {
    if (this.addProductForm.valid) {
      this.ProductObj = { ...this.addProductForm.value };
    } else {
      this.addProductForm.markAllAsTouched();
    }
  }

  onSubmit2() {
    if (this.productInfo.valid) {
      this.ProductObj = { ...this.ProductObj, ...this.productInfo.value }; 
      // second the form value in one obj to send whole data at one place 
      // console.log(this.ProductObj);
    } else {
      this.productInfo.markAllAsTouched();
    }
  }

  onSubmitfinal() {
  //  this.onSubmit();
    this.onSubmit2();
    if (!this.productIdToEdit && this.addProductForm.contains('pId')) {
      this.addProductForm.removeControl('pId');
    }

    if (!this.productIdToEdit) { 
      // console.log("added ones",this.ProductObj);
      this.sellerService.addNewproduct(this.ProductObj)
      .subscribe(
        response=>{
          // console.log("added new prod",response);
          this.toastr.success('Success Message', "Add New Product Successfully!", {
            timeOut: 1000
          });
        },
        error=>{
          this.toastr.error('Error Message', "Failed to Add New Product !", {
            timeOut: 1000
          });
        }
      );
     
    }else{
      // console.log("edited",this.ProductObj);
      this.sellerService.updateProduct(this.ProductObj)
      .subscribe(
        response=>{
          // console.log("added new prod",response);
          this.toastr.success('Success Message', "Updated Product Successfully!", {
            timeOut: 1000
          });
        },
        error=>{
          this.toastr.error('Error Message', "Failed to Update Your Product !", {
            timeOut: 1000
          });
        }
      );    
    }
    this.addProductForm.reset();
    this.productInfo.reset();
  }
}
