import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { UserService } from '../services/api/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email_addr: string;

  constructor(
    public formBulider: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userServ: UserService
  ) { }

  ngOnInit() {
  }

  sendResetRequest() {
    if (this.email_addr == undefined) {
      alert("คุณไม่ได้กรอกข้อมูล")
    }
    else{
      let emailForm = new FormGroup({
        email: new FormControl(this.email_addr)
      })
      this.userServ.ReqRstPasswd(emailForm.value)
        .subscribe((res) => {
          alert("ทำการส่งคำขอรีเซ็ต Password แล้ว")
          console.log(res)
        },
        (err) => {
          console.log(err)
        }
      )      
    }

  }

}
