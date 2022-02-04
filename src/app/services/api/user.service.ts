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
  gender?: string;
}

export class UserLogin {
  _id?: String;
  username?: String;
  email?: String;
  password!: string;
  exp?: string;
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

  ReqUserDetail(userID: string): Observable<any>{
    let API_URL = `${this.REST_API}/user/` + userID;
    if (localStorage.getItem('jwt') != undefined){
      let jsonToken = JSON.parse(localStorage.getItem("jwt"))
      let authMessage = 'Bearer ' + jsonToken["accessToken"]
      let tokenHeaders = new HttpHeaders().set('Authorization',authMessage)
      return this.httpClient.get(API_URL,{headers:tokenHeaders})
      .pipe(map((res:any) => {
        return res || {}
      }),
      catchError(this.handleError)
      )
    }
    else {
      return this.httpClient.get(API_URL)
      .pipe(map((res:any) => {
        return res || {}
      }),
      catchError(this.handleError)
      )
    }
  }

  ReqLogout(){
    let jsonToken = JSON.parse(localStorage.getItem("jwt"))
    let API_URL = `${this.REST_API}/auth/logout`;
    let authMessage = 'Bearer ' + jsonToken["accessToken"]
    console.log(authMessage);
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);
    //remove token from client 
    localStorage.removeItem("jwt");
    localStorage.removeItem("usr_acc");
    // sent logout request to server

    return this.httpClient.delete(API_URL,{headers:tokenHeaders,responseType:"text"})
      .pipe(map((res:any) => {
        return res || {}
      }),
      catchError(this.handleError)
      )

  }

  private loadJwt() {
    let jsonToken = JSON.parse(localStorage.getItem("jwt"))
    return jsonToken["accessToken"]
  }

  /* private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  } */     
}
