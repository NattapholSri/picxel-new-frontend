import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import * as moment from "moment";
import { UserDetails,UserLogin,UserRegistration,JsonMail } from '../data-model/user.model';

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

  ReqLogout() {
    let jsonToken = this.loadJwt()
    let API_URL = `${this.backend_API}/auth/logout`;
    let authMessage = 'Bearer ' + jsonToken;
    // console.log(authMessage);
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);
    //remove token from client 
    localStorage.removeItem("jwt");
    localStorage.removeItem("usr_login");
    localStorage.removeItem('tkTime')
    // sent logout request to server

    return this.httpClient.delete(API_URL,{headers:tokenHeaders})
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
    localStorage.removeItem('tkTime')

    return this.httpClient.delete(API_URL,{headers:tokenHeaders,responseType:"text"})
      .pipe(map((res:any) => {
        return res || {}
      }),
      catchError(this.handleError)
      )
  }

  ReqOTP(email: JsonMail){
    let API_URL = `${this.backend_API}/otp/email`;
    return this.httpClient.post(API_URL,email)
      .pipe(map((res:any) => {
        return res || {}
      }),
      catchError(this.handleError)
      )
  }

  AutoLogout(){
    let now = moment()
    if (localStorage.getItem('tkTime') != undefined){
      let tokenTimeout = moment(localStorage.getItem('tkTime'),"HH:mm DD-MM-YYYY")
      if (tokenTimeout <= now){
        localStorage.removeItem('tkTime')
        localStorage.removeItem('jwt')
        localStorage.removeItem('usr_login')
        console.log('token timeout')
      }
      else{
        console.log('token is in use')
      }
    }
    else{
      console.log('no token/no user logging in now')
    }  
  }

  updateUserData(data:UserDetails){
    let jsonToken = this.loadJwt()
    let API_URL = `${this.backend_API}/user/update`;
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);
  
    return this.httpClient.put(API_URL, data,{headers:tokenHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )

  }

  ReqRstPasswd(email:JsonMail){
    let API_URL = `${this.backend_API}/user/reset-password`;
    return this.httpClient.post(API_URL, email)
      .pipe(
        catchError(this.handleError)
      )
  }

  SearchUser(keyword:string,limitview?:number,page?:number){
    if (limitview == undefined){
      limitview = 20
    }
    if (page == undefined){
      page = 1
    }
    let API_URL = `${this.backend_API}/user/search?username=${keyword}&limit=${keyword}&page=${page}`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.get(API_URL,{headers:tokenHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }
}
