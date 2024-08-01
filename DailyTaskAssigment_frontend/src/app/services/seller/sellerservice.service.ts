import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class SellerserviceService {
  private isAuthenticateSeller = false;
  private authSecretKey = 'Seller-Token';
  private apiUrl = 'http://localhost:5269';

  constructor( private router: Router, private http : HttpClient) {
    this.isAuthenticateSeller = !!localStorage.getItem(this.authSecretKey);
  }

  //with backend 
  sellerlogin(loginUserDetails:any): Observable<boolean>{
    // var isLogin : boolean = false;
    return new Observable<boolean>((observer)=>{
      this.getloginData(loginUserDetails).subscribe(
        response => {
        //  console.log(response);
          if(response){
            this.isAuthenticateSeller = true;
            const authToken = response.token;
            localStorage.setItem(this.authSecretKey, authToken);
            observer.next(true);
            observer.complete();
          }
        },
        (error : HttpErrorResponse) => {
          console.error('There was an error!', error.error.message);
          observer.next(false);
          observer.complete();
        }
      );
    });
    // return isLogin;  -- can't use bcz it return before res, due to async nature of http req so use observable to send true/false
  }

  isAuthenticatedSeller(): boolean {
    return this.isAuthenticateSeller;
  }

  logout(): void {
    console.log("you log out as a seller ");
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticateSeller = false;
    this.router.navigate(['/seller']);
  }

  registerSeller(user:any):Observable<any>{
    // console.log(user);
    return this.http.post<any>(`${this.apiUrl}/addSeller`, user);
  }

  getloginData(user:any):Observable<any>{
    // console.log(user);
    return this.http.post<any>(`${this.apiUrl}/loginSeller`,user);
  }

  getallSellerData():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getallSeller`);
  }

  editSellerActiveStatus(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/editStatus/${id}`);
  }

  DeleteSeller(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteSeler/${id}`);
  }

  getSellerDetails(): Observable<any>{
    var token = localStorage.getItem('Seller-Token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/getSeller`,{headers});
  }

  updateSellerDetails(seller:any):Observable<any>{
    var token = localStorage.getItem('Seller-Token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.patch<any>(`${this.apiUrl}/updateSeller`, seller,{headers});
  }

  // ------------------- Products related requests 

  addNewproduct(product:any):Observable<any>{
    //console.log("product to add",product);
    var token = localStorage.getItem('Seller-Token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/addproduct`,product,{headers});
  }

  GetAllProducts():Observable<any>{
    var token = localStorage.getItem('Seller-Token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/getAllProduct`,{headers});
  }

  GetproductById(id:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getProductById/${id}`)
  }

  GetproductByCategory(categories:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getProductByCategory/${categories}`)
  }

  updateProduct(product:any):Observable<any>{
    var token = localStorage.getItem('Seller-Token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.patch<any>(`${this.apiUrl}/updateProduct`,product,{headers});
  }

  deleteProduct(id:any):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/DeletedProductById/${id}`)
  }
}
