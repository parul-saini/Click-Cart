import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  private isAuthenticateAdmin = false;
  private authSecretKey = 'Admin-Token';
  private apiUrl = 'http://localhost:5269';

  constructor( private router: Router, private http:HttpClient) {
    this.isAuthenticateAdmin = !!localStorage.getItem(this.authSecretKey);
   }

  adminlogin(loginUserDetails:any){
    return new Observable<boolean>((observer)=>{
      this.getloginData(loginUserDetails).subscribe(
        response => {
        //  console.log(response);
          if(response){
            this.isAuthenticateAdmin = true;
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
  }

  isAuthenticatedAdmin(): boolean {
    return this.isAuthenticateAdmin;
  }

  logout(): void {
    console.log("you log out as a admin ");
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticateAdmin = false;
    this.router.navigate(['/admin']);
  }

  registerAdmin(user:any):Observable<any>{
    // console.log(user);
    return this.http.post<any>(`${this.apiUrl}/addAdmin`, user);
  }

  getloginData(user:any):Observable<any>{
    // console.log(user);
    return this.http.post<any>(`${this.apiUrl}/loginAdmin`,user);
  }
}
