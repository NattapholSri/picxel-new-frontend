import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import * as moment from "moment";

export class UserDetails {
  _id?: String;
  username!: String;
  email!: String;
  password!: string;
  gender?: string;
  picture_url?: string;
}

export class UserLogin {
  _id?: string;
  username?: string;
  email?: string;
  password!: string;
  exp?: string;
}

export class UserRegistration {
  _id?: string;
  username!: string;
  email!: string;
  password!: string;
  mailotp!: string;
}

export class JsonMail {
  email!: string;
}

@Injectable({
  providedIn: 'root'
})


export class UserService {

  //Backend API
  backend_API: string = 'http://katteni.thddns.net:5051';

  httpHeaders = new HttpHeaders().set('Content-type','application/json');
  

  constructor(private httpClient: HttpClient) { }

  ReqLogin(data: UserLogin): Observable<any> {
    let API_URL = `${this.backend_API}/auth/login`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse){
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

  ReqRegister(data: UserRegistration): Observable<any> {
    let API_URL = `${this.backend_API}/user/register`;
    return this.httpClient.post(API_URL, data,{responseType: 'text'})
      .pipe(
        catchError(this.handleError)
      )
  }

  private isOwnAccount(accountName:string):any{
    let hasToken = localStorage.getItem('jwt') != undefined;
    let isAccont = localStorage.getItem('usr_login') == accountName;
    return hasToken && isAccont
  }

  ReqUserDetail(userID: string): Observable<any>{
    let API_URL = `${this.backend_API}/user/` + userID;
    if (this.isOwnAccount(userID)){
      let jsonToken = this.loadJwt()
      let authMessage = 'Bearer ' + jsonToken
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
    let jsonToken = this.loadJwt()
    let API_URL = `${this.backend_API}/auth/logout`;
    let authMessage = 'Bearer ' + jsonToken;
    // console.log(authMessage);
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);
    //remove token from client 
    localStorage.removeItem("jwt");
    localStorage.removeItem("usr_login");
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

  deleteUser(){
    let jsonToken = this.loadJwt()
    let API_URL = `${this.backend_API}/user/delete`;
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);
    //remove token from client 
    localStorage.removeItem("jwt");
    localStorage.removeItem("usr_login");

    return this.httpClient.delete(API_URL,{headers:tokenHeaders,responseType:"text"})
      .pipe(map((res:any) => {
        return res || {}
      }),
      catchError(this.handleError)
      )
  }

  ReqOTP(email: JsonMail){
    let API_URL = `${this.backend_API}/otp/email`;
    return this.httpClient.post(API_URL,email,{responseType:'text'})
      .pipe(map((res:any) => {
        return res || {}
      }),
      catchError(this.handleError)
      )
  }

  AutoLogout(){
    let now = moment() 
    let tokenTimeout = moment(localStorage.getItem('tkTime'),"HH:mm DD-MM-YYYY")
    if (tokenTimeout < now){
      localStorage.removeItem('tkTime')
      localStorage.removeItem('jwt')
      localStorage.removeItem('usr_login')
      console.log('token timeout')
    }
    else{
      console.log('token is in use')
    }   
  }

  /* private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  } */     
}
