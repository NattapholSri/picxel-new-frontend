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
    if (jsonToken == undefined){
      return undefined
    }
    else{
      return jsonToken["accessToken"]
    }
  }


  // Service's main function/Methods for Post

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

    let jsonToken = this.loadJwt()
   
    let API_URL = `${this.backend_post_API}/post/search?userId=${user_s_id}&limit=${limitview}&page=${page}`;

    if (jsonToken != undefined){
      let authMessage = 'Bearer ' + jsonToken;
      let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

      return this.httpClient.get(API_URL,{headers:tokenHeaders})
      .pipe(map((res:any) => {
        return res || {}
      }),
      catchError(this.handleError)
      )
    }
    else{

      return this.httpClient.get(API_URL)
      .pipe(map((res:any) => {
        return res || {}
      }),
      catchError(this.handleError)
      )
    }
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

  DeleteAllPost(delete_user_Id:string): Observable<any>{
    let dataToSent:UserIdReq = {userId:delete_user_Id}


    console.log('deleting post from user '+ dataToSent.userId)
    let API_URL = `${this.backend_post_API}/post/delete-all`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);
    
    return this.httpClient.delete(API_URL,{headers:tokenHeaders,body:dataToSent})
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

  // Service's Like/Sentiment function for Post

  LikePost(toPost:PostData){
    let API_URL = `${this.backend_post_API}/post/like`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.post(API_URL, toPost,{headers:tokenHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  LikePostList(fromPostId:string){
    let API_URL = `${this.backend_post_API}/post/like/search?postId=${fromPostId}&all=1`;

    return this.httpClient.get(API_URL)
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  UserLikePostList(fromUserId:string){
    let API_URL = `${this.backend_post_API}/post/like/search?userId=${fromUserId}&all=1`;

    return this.httpClient.get(API_URL)
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  // Post's comment Service function 

  CommentOnPost(toPostId:PostData){
    let API_URL = `${this.backend_post_API}/post/comment/create`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.post(API_URL, toPostId,{headers:tokenHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  searchCommentOnPost(fromPostId:string){
    let API_URL = `${this.backend_post_API}/post/comment/search?_id=${fromPostId}`;

    return this.httpClient.get(API_URL)
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

}
