import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5269';
  private isAuthenticate = false;
  private authSecretKey = 'MyToken';


   // BehaviorSubject to hold cart items and notify changes
   private cartItemsSource = new BehaviorSubject<any[]>([]);
   cartItems$ = this.cartItemsSource.asObservable();

  constructor( private router: Router,private toastr: ToastrService, private http: HttpClient) {
    this.isAuthenticate = !!localStorage.getItem(this.authSecretKey);
   }

  login(loginUserDetails:any): Observable<boolean>{
    // var isLogin : boolean = false;
    return new Observable<boolean>((observer)=>{
      this.getData(loginUserDetails).subscribe(
        response => {
        //  console.log(response);
          if(response){
            //console.log("token",response);
            this.isAuthenticate = true;
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
    // return isLogin;  -- can't use bcz it return before res due to async nature of http req
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticate;
  }

  logout(): void {
   // console.log("you log out");
    this.toastr.error('Error Message', "You log out", {
      timeOut: 3000
    });
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticate = false;
    this.router.navigate(['/login']);
  }
    
  // http requests code to get and post the data in server----------------
  getData(loginUserDetails:any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/loginUser`,loginUserDetails);
  }

  registerUser(user:any):Observable<any>{
    // console.log(user);
    return this.http.post<any>(`${this.apiUrl}/adduser`, user);
  }


  // Add To cart ---------------------
  addToCartItem(item:any):Observable<any>{
    var token = localStorage.getItem('MyToken');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/addToCart`,item,{headers});
  }

  getCartItems():Observable<any>{
    var token = localStorage.getItem('MyToken');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/getAllCartItems`,{headers});
  }

  RemoveFromCart(prodId:any):Observable<string>{
    var token = localStorage.getItem('MyToken');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/DeleteCartItem/${prodId}`,{headers});
  }

  ClearCart():Observable<string>{
    var token = localStorage.getItem('MyToken');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/clearCart`,{headers});
  }

  //  ----------
   // Load cart items and update BehaviorSubject
   private loadCartItems() {
    this.getCartItems().subscribe(
      response => {
        this.cartItemsSource.next(response);
      },
      error => {
        console.error('Error loading cart items', error);
      }
    );
  }

  // Update cart items in BehaviorSubject
  updateCartItems(items: any[]) {
    this.cartItemsSource.next(items);
  }
}

