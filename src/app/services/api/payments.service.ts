import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { omiseRecipt } from '../data-model/omise.model';
import { donateForm,buySinglePost } from '../data-model/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

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

  // Work with Omise service
  // need to change structure if change service

  createCustomer(){
    let API_URL = `${this.backend_post_API}/payment/customer`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    console.log(authMessage)
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.post(API_URL,undefined,{headers:tokenHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  addCustomerCard(omise_card_token:string): Observable<any>{
    let cardTokenData:any = {omiseToken:omise_card_token}


    let API_URL = `${this.backend_post_API}/payment/customer-card`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.post(API_URL,cardTokenData,{headers:tokenHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  deleteCustomerCard(card_id:string): Observable<any>{
    let cardTokenData:any = {cardId:card_id}

    let API_URL = `${this.backend_post_API}/payment/card`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.delete(API_URL,{headers:tokenHeaders,body:cardTokenData})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  listCustomerCard(): Observable<any>{

    let API_URL = `${this.backend_post_API}/payment/customer-cards`;

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

  addSchedule(omise_card_token:string): Observable<any>{
    let cardTokenData:any = {omiseToken:omise_card_token}

    let API_URL = `${this.backend_post_API}/payment/schedule`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.post(API_URL,cardTokenData,{headers:tokenHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }
  
  listSchedule(){

  }

  createRecipient(data:omiseRecipt){

    let API_URL = `${this.backend_post_API}/payment/recipient`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.post(API_URL,data,{headers:tokenHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  deleteRecipient(data:string){
    let reqForm = {respId: data}
    let API_URL = `${this.backend_post_API}/payment/recipient`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.delete(API_URL,{headers:tokenHeaders,body:reqForm})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  // list specific customer recipt

  getCustomerReciptInfo(){

    let API_URL = `${this.backend_post_API}/payment/customer`;

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

  getRecipientInfo(recipt_tk_id:string){
    let reqForm = {respId: recipt_tk_id}
    let API_URL = `${this.backend_post_API}/payment/get-recipient`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.post(API_URL,reqForm,{headers:tokenHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }
  
  donateTo(data:donateForm){
    let API_URL = `${this.backend_post_API}/user/donate`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.post(API_URL,data,{headers:tokenHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  purchasePost(data:buySinglePost){
    let API_URL = `${this.backend_post_API}/purchase/`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.post(API_URL,data,{headers:tokenHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

}
