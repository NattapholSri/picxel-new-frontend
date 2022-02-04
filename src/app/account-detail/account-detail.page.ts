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
  token = localStorage.getItem('jwt');
  jsonToken = JSON.parse(this.token);
  knowUser = false;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private userServ: UserService
  ) { }

  ngOnInit() {
  }

  checkJWT(){ 
    console.log(this.token)
    alert(this.jsonToken["accessToken"])
    this.knowUser = true;
  }

  checkUser(){
    // get user data methods
    this.userServ.ReqUserDetail(localStorage.getItem('usr_acc'))
    .subscribe((res)=> console.log(res))
  }

  deleteAccount(){
    // deletion methods
  }

  userLogout(){
    this.userServ.ReqLogout() 
    .subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )

    console.log(localStorage.getItem('jwt'))
    console.log("username: "+ localStorage.getItem('usr_acc'))
    this.ngZone.run(() => this.router.navigateByUrl('/home'))
  }
}
