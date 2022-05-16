import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree,CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let logged_in_token = (localStorage.getItem('jwt') != undefined)  // if it has token
      let logged_time_out = (localStorage.getItem('tkTime') != undefined) // if it has timeout
      if (logged_in_token && logged_time_out){  
        return true
      }
      else{
        this.router.navigate(['/account-login'])
        return false;
      }
   
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const logged_in_token = (localStorage.getItem('jwt') != undefined)
      const logged_time_out = (localStorage.getItem('tkTime') != undefined) 
      if (!(logged_in_token && logged_time_out)){
        this.router.navigate(['/account-login'])
      }
    return true;
  }

}
