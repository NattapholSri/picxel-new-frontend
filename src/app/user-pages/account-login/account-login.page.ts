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

  async onSubmit() {

    let loginForm = new FormGroup({
      username: new FormControl(this.usr_name),
      password: new FormControl(this.passwd),
      exp: new FormControl('60m')
    })
    
    if (this.passwd == undefined || this.usr_name == undefined
      || this.usr_name == '' || this.passwd == '') {
      alert("คุณยังกรอกข้อมูลในช่องไม่ครบ")
    } 
    else{
      console.log(loginForm.value)
      await this.loadingCtrl.create({
        message: 'กำลังเข้าสู่ระบบ PICXEL',
        spinner: "dots"
      }).then((res) => {
        res.present();
      })

      this.userServ.ReqLogin(loginForm.value)
      .subscribe( async (res) => {
        console.log(res)
        this.userServ.ReqUserDetail(this.usr_name).subscribe((res) => {
          console.log(res._id)
          localStorage.setItem('current_log_uid',res._id) // user's id who is logging in
          if (res.omise_customer_id != undefined && res.omise_customer_id != null){
            console.log('saved omise id')
            localStorage.setItem('current_omise_customer',res.omise_customer_id)
          }
          else{
            console.log('no omise id')
            localStorage.removeItem('current_omise_customer')
          }
  
        })
        localStorage.setItem('jwt', JSON.stringify(res)) // token
        
        localStorage.setItem('usr_login',this.usr_name) // user's name who is logging in
        let tokenTimeout = moment().add(60, 'minutes')

        // if has omise_customer
        
        localStorage.setItem('tkTime',tokenTimeout.format("HH:mm DD-MM-YYYY"))
        console.log(localStorage.getItem('tkTime'))

        await this.loadingCtrl.dismiss().then((res) => {
          console.log('Login Success!', res);
        }).catch((error) => {
          console.log('error', error);
        })

        this.ngZone.run(() => {
          //this.router.navigateByUrl('/account-detail/'+this.usr_name)
          this.router.navigateByUrl('/home')
        })
      },
      (err) => {
        console.log(err)
        this.loadingCtrl.dismiss().then((res) => {
          console.log('stopped loading', res);
        }).catch((error) => {
          console.log('error', error);
        })
        this.ngZone.run(() => {
          alert('เกิดข้อผิดพลาด โปรดตรวจสอบข้อมูลที่กรอก')
        })
      })
    }
  }

}
