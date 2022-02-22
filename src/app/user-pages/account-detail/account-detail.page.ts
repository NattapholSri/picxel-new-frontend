import { Component, OnInit,NgZone } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/api/user.service';
import { AlertController } from '@ionic/angular';


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
  isUser = false;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private userServ: UserService,
    private activatedRt: ActivatedRoute,
    private alertCtrl: AlertController
  ) { 
    this.user_id = this.activatedRt.snapshot.paramMap.get('username')
    this.userServ.ReqUserDetail(this.user_id).subscribe((res) => {
      localStorage.setItem('usernow',res)
      this.usr_acc = res
      console.log(this.usr_acc)
    })
  }

  ngOnInit() {
    console.log(this.user_id)
    this.usr_acc = JSON.stringify(localStorage.getItem('usernow'))
    this.userServ.AutoLogout()
    console.log(localStorage.getItem('tkTime'))
  }

  checkThisUserDetail(){ 
    console.log((this.usr_acc))    
  }

  checkUser(){
    // get user data methods
    this.userServ.ReqUserDetail(localStorage.getItem('usr_login'))
    .subscribe((res)=> console.log(res))
  }

  deleteAccount(){
    // deletion methods
    this.alertCtrl.create(
      {header: 'คุณแน่ใจแล้วใช่ไหม',
      message: 'การลบบัญชีผู้ใช้ ระบบจะทำการลบข้อมูลทั้งที่เกี่ยวข้องกับบัญชีนี้ และไม่สามารถกู้คืนข้อมูลได้',
      buttons: [
        {
        text: 'ยกเลิก',
        role: 'cancel'
        },{
          text: 'แน่นอน',
          handler: () => {
            this.userServ.deleteUser()
            .subscribe((res)=> console.log(res))
            this.ngZone.run(() => this.router.navigateByUrl('/'))
          }
        }
      ]
      }
    ).then(alertEl =>{
      alertEl.present()
    })

  }

  userLogout(){
    this.userServ.ReqLogout() 
    .subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )

    this.ngZone.run(() => this.router.navigateByUrl('/'))
  }

}
