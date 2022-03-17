import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';

export interface PostData {
  postId?: string;
  text?: string;
  pics?: string[];
  tags?: string[];
  requireSub?: boolean;
}

export interface UserIdReq{
  userId: string;
}


@Injectable({
  providedIn: 'root'
})
export class PostingService {

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


  // Service's function/Methods

  CreatePost(data: PostData): Observable<any>{
    let API_URL = `${this.backend_post_API}/post/create`;

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

  SearchPost(user_s_id:string,limitview?:number,page?:number): Observable<any>{
    if (limitview == undefined){
      limitview = 20
    }
    if (page == undefined){
      page = 1
    }
    let API_URL = `${this.backend_post_API}/post/search?userId=${user_s_id}&limit=${limitview}&page=${page}`;

    return this.httpClient.get(API_URL)
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  UpdatePost(data: PostData): Observable<any>{
    let API_URL = `${this.backend_post_API}/post/update`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);
    
    return this.httpClient.put(API_URL, data,{headers:tokenHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  DeletePost(delete_data_Id:PostData){
    console.log('deleting '+ delete_data_Id.postId)
    let API_URL = `${this.backend_post_API}/post/delete`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);
    
    return this.httpClient.delete(API_URL,{headers:tokenHeaders,body:delete_data_Id})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  DeleteAllPost(delete_user_Id:UserIdReq): Observable<any>{

    console.log('deleting post from user '+ delete_user_Id.userId)
    let API_URL = `${this.backend_post_API}/post/delete`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);
    
    return this.httpClient.delete(API_URL,{headers:tokenHeaders,body:delete_user_Id})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  LoadRandomPost(){
    let API_URL = `${this.backend_post_API}/feed/generate`;

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
