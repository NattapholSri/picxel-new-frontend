import { Injectable } from '@angular/core';
import { catchError,map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { planData,subScriptionData } from '../data-model/subscription.model'


@Injectable({
  providedIn: 'root'
})
export class SubscriptPlanService {

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

  // service function

  createPlan(planData:planData){
    let API_URL = `${this.backend_post_API}/subscription/plan-create`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.post(API_URL, planData,{headers:tokenHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  updatePlan(plan:planData){
    let API_URL = `${this.backend_post_API}/subscription/plan-update`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.put(API_URL, plan,{headers:tokenHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  deletePlan(plan_id:string){
    console.log(plan_id)
    let plan_data = { planId:plan_id}

    let API_URL = `${this.backend_post_API}/subscription/plan-delete`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.delete(API_URL,{headers:tokenHeaders,body:plan_data})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  createSubscription(subData:subScriptionData){
    let API_URL = `${this.backend_post_API}/subscription/subscribe`;

    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);

    return this.httpClient.post(API_URL, subData,{headers:tokenHeaders})
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  updateSubscription(subData:subScriptionData){
    let API_URL = `${this.backend_post_API}/subscription/update`;
  
    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);
  
    return this.httpClient.post(API_URL, subData,{headers:tokenHeaders})
      .pipe(map((res:any) => {
        return res || {}
      }),
    catchError(this.handleError)
    )
  }

  // unused/legacy

  deleteSubscription(subData:subScriptionData){
    let API_URL = `${this.backend_post_API}/subscription/delete`;
  
    let jsonToken = this.loadJwt()
    let authMessage = 'Bearer ' + jsonToken;
    let tokenHeaders = new HttpHeaders().set('Authorization',authMessage);
  
    return this.httpClient.delete(API_URL,{headers:tokenHeaders,body:subData})
      .pipe(map((res:any) => {
        return res || {}
      }),
    catchError(this.handleError)
    )
  }

  // no token require

  searchPlan(userId:string){
    let API_URL = `${this.backend_post_API}/subscription/plan-search?all=1&createdBy=${userId}`;

    return this.httpClient.get(API_URL)
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  searchSubscription(userId:string,creatorId:string){
    let API_URL = `${this.backend_post_API}/subscription/subscription-search?_id=${userId}:${creatorId}`;

    return this.httpClient.get(API_URL)
    .pipe(map((res:any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }


}
