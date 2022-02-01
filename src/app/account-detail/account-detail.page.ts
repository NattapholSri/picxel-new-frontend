import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/api/user.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.page.html',
  styleUrls: ['./account-detail.page.scss'],
})
export class AccountDetailPage implements OnInit {

  usr_acc_head = "Hello " + localStorage.getItem('usr_acc');

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private userServ: UserService
  ) { }

  ngOnInit() {
  }

  checkJWT(){
    const token = localStorage.getItem('jwt');
    const json = JSON.parse(token);
    console.log(token)
    alert(json["accessToken"])
  }

  checkUser(){
    // get user data methods
  }

  deleteAccount(){
    // deletion methods
  }

  userLogout(){
    this.userServ.ReqLogout()
    this.ngZone.run(() => this.router.navigateByUrl('/home'))
    console.log(localStorage.getItem('jwt'))
    console.log("username: "+ localStorage.getItem('usr_acc'))
  }
}
