import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { UserService } from '../../services/api/user.service';
import * as moment from "moment";
// import { AlertController } from '@ionic/angular';

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
    private userServ: UserService

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
      this.userServ.ReqLogin(loginForm.value)
      .subscribe((res) => {
        console.log(res)
        localStorage.setItem('jwt', JSON.stringify(res))
        localStorage.setItem('usr_login',this.usr_name)
        let tokenTimeout = moment().add(20, 'minutes')
        localStorage.setItem('tkTime',tokenTimeout.format("HH:mm DD-MM-YYYY"))
        console.log(localStorage.getItem('tkTime'))

        this.ngZone.run(() => this.router.navigateByUrl('/account-detail/'+this.usr_name))
      },
      (err) => {
        console.log(err)
        alert('เกิดข้อผิดพลาด โปรดตรวจสอบข้อมูลที่กรอก')
      })
    }
  }

}
