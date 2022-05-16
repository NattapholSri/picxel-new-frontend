import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree,Router,CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisableIfLoginGuard implements CanDeactivate<unknown>,CanActivate {

  constructor(private router: Router){}

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let logged_in_token = (localStorage.getItem('jwt') != undefined)  // if it has token
      let logged_time_out = (localStorage.getItem('tkTime') != undefined) // if it has timeout
      if (logged_in_token && logged_time_out){ // if login 
        this.router.navigate(['/home']) 
        return true // deactivate
      }   
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let logged_in_token = (localStorage.getItem('jwt') != undefined)  // if it has token
      let logged_time_out = (localStorage.getItem('tkTime') != undefined) // if it has timeout
      if (logged_in_token && logged_time_out){ 
        this.router.navigate(['/home']) 
        return false
      }
      else{
        
        return true;
      }
   
  }
}
