import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';

import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";


// Set the AWS Region.
const REGION = "ap-southeast-1"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });

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

  reqUploadURL(file_type:string){
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
  }

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

  direct_upload_aws(file:File,file_name?:string){
    if (file_name != undefined){
      var bucketParams = {
        Bucket: "picxel-post-pictures",
        Key: file_name,
        Body: file,
      }
    }
    else{
      var bucketParams = {
      Bucket: "picxel-post-pictures",
      // Specify the name of the new object. For example, 'index.html'.
      // To create a directory for the object, use '/'. For example, 'myApp/package.json'.
      Key: file.name,
      // Content of the new object.
      Body: file,
      }
    }

  }

}
