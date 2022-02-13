import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/api/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(router: Router,userServ: UserService) {
    userServ.AutoLogout()
    if (localStorage.getItem('tkTime') != undefined 
      && localStorage.getItem('jwt') != undefined) {
      router.navigate(['home']);
    }
  }
}
