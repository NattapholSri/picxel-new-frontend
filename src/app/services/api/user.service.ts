import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
// import * as moment from "moment";

export class UserDetails {
  _id?: String;
  username!: String;
  email!: String;
  password!: string;
}

export class UserLogin {
  _id?: String;
  username?: String;
  email?: String;
  password!: string;
}

@Injectable({
  providedIn: 'root'
})


export class UserService {

  //Backend API
  REST_API: string = 'http://katteni.thddns.net:5051';

  httpHeaders = new HttpHeaders().set('Content-type','application/json');

  constructor(private httpClient: HttpClient) { }

  ReqLogin(data: UserLogin): Observable<any> {
    let API_URL = `${this.REST_API}/auth/login`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    /* if (error.status == 201) {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`+"\nrun successful but failure response";
    } */
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
      
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  ReqRegister(data: UserDetails): Observable<any> {
    let API_URL = `${this.REST_API}/user/register`;
    return this.httpClient.post(API_URL, data,{responseType: 'text'})
      .pipe(
        catchError(this.handleError)
      )
  }

  ReqLogout(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("usr_acc");
  }

  /* private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
}     */
}
