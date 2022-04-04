import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';

export interface userData {
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FollowUserService {

 
  backend_post_API: string = 'http://katteni.thddns.net:5051';

  httpHeaders = new HttpHeaders().set('Content-type','application/json');
  

  constructor(private httpClient: HttpClient) { }

  // Private/Build in class Function
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

  private loadJwt() {
    let jsonToken = JSON.parse(localStorage.getItem("jwt"))
    return jsonToken["accessToken"]
  }

  followToUser(target:userData):Observable<any>{
    let API_URL = `${this.backend_post_API}/user/follow`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.post(API_URL, target,{headers:tokenHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  getUserFollowerFrom(user_id:string):Observable<any>{
    let API_URL = `${this.backend_post_API}/user/follow/search?from=${user_id}&all=1`;

    return this.httpClient.get(API_URL)
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  getUserFollowerTo(user_id:string):Observable<any>{
    let API_URL = `${this.backend_post_API}/user/follow/search?to=${user_id}&all=1`;

    return this.httpClient.get(API_URL)
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  FollowToUser(from_user_id:string,to_user_id:string){
    let API_URL = `${this.backend_post_API}/user/follow/search?_id=${from_user_id}:${to_user_id}`;


    return this.httpClient.get(API_URL)
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  randomUser(){
    let API_URL = `${this.backend_post_API}/feed/suggest-user`;
  }
}
