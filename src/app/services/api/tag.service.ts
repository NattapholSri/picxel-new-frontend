import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';

export interface TagDetail {
  _id?: string;
  name?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TagService {

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


  CreateTag(data:TagDetail): Observable<any>{
    let API_URL = `${this.backend_post_API}/tag/create`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.post(API_URL, data,{headers:tokenHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  SearchTag(keyword:string,limitview?:number,page?:number): Observable<any>{
    if (limitview == undefined){
      limitview = 15
    }
    if (page == undefined){
      page = 1
    }
    let API_URL = `${this.backend_post_API}/tag/search?_id=${keyword}&limit=${limitview}&page=${page}`;
    if (keyword == '' || keyword == undefined){
      API_URL = `${this.backend_post_API}/tag/search?limit=${limitview}&page=${page}&all=1`;
    }

    /* let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage); */

    return this.httpClient.get(API_URL)
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  GetAll() {
    let limitview = 10000
    let page = 1
    let API_URL = `${this.backend_post_API}/tag/search?limit=${limitview}&page=${page}&all=1`;

    /* let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage); */

    return this.httpClient.get(API_URL)
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }
}
