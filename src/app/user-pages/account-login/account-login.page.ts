import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { UserService } from '../../services/api/user.service';
import * as moment from "moment";
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.page.html',
  styleUrls: ['./account-login.page.scss'],
})
export class AccountLoginPage implements OnInit {

  passwd: string;
  usr_name: string;

  constructor(
    public formBulider: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userServ: UserService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.userServ.AutoLogout()
  }

  onSubmit():any {
    const loginForm = new FormGroup({
      username: new FormControl(this.usr_name),
      password: new FormControl(this.passwd),
      exp: new FormControl("30m")
    })
    
    if (this.passwd == undefined || this.usr_name == undefined) {
      alert("คุณยังกรอกข้อมูลไม่ครบ")
    } 
    else{
      // console.log(loginForm.value)
      this.loadingCtrl.create({
        message: 'กำลังเข้าสู่ระบบ PICXEL',
        spinner: "dots"
      }).then((res) => {
        res.present();
      })

      this.userServ.ReqLogin(loginForm.value)
      .subscribe((res) => {
        console.log(res)
        this.userServ.ReqUserDetail(this.usr_name).subscribe((res) => {
          console.log(res._id)
          localStorage.setItem('current_log_uid',res._id)
        })
        localStorage.setItem('jwt', JSON.stringify(res))
        
        localStorage.setItem('usr_login',this.usr_name)
        let tokenTimeout = moment().add(25, 'minutes')

        this.loadingCtrl.dismiss().then((res) => {
          console.log('Login Success!', res);
        }).catch((error) => {
          console.log('error', error);
        })

        localStorage.setItem('tkTime',tokenTimeout.format("HH:mm DD-MM-YYYY"))
        console.log(localStorage.getItem('tkTime'))


        this.ngZone.run(() => this.router.navigateByUrl('/account-detail/'+this.usr_name))
      },
      (err) => {
        console.log(err)
        this.loadingCtrl.dismiss().then((res) => {
          console.log('stopped loading', res);
        }).catch((error) => {
          console.log('error', error);
        })
        alert('เกิดข้อผิดพลาด โปรดตรวจสอบข้อมูลที่กรอก')
      })
    }
  }

}
