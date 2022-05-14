import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PictureManageService {

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
    if (jsonToken == undefined){
      return undefined
    }
    else{
      return jsonToken["accessToken"]
    }
  }

  /* reqUploadURL(file_type:string){
    let API_URL  = `${this.backend_post_API}/post/pic-upload-url?type=${file_type}`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.get(API_URL,{headers:tokenHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    ) 
  } */

  uploadPicToURL(api_url:string,file:File){

    let uploadHeader = new HttpHeaders().set('Content-Type','multipart/form-data');

    console.log(api_url)
    console.log(file)

    return this.httpClient.put(api_url,file)
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )

  }

  requestProfilePicURL(file_type:string){
    let API_URL  = `${this.backend_post_API}/user/pic-upload-url?type=${file_type}`;

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
