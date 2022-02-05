import { Component, OnInit,NgZone } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { UserService } from '../services/api/user.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.page.html',
  styleUrls: ['./account-detail.page.scss'],
})
export class AccountDetailPage implements OnInit {

  usr_acc: any;
  token = localStorage.getItem('jwt');
  jsonToken = JSON.parse(this.token);
  knowUser = false;
  user_id: string;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private userServ: UserService,
    private activatedRt: ActivatedRoute
  ) { this.user_id = this.activatedRt.snapshot.paramMap.get('username');
}

  ngOnInit() {
    console.log(this.user_id)
    this.usr_acc = this.userServ.ReqUserDetail(this.user_id)
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
