import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { UserService } from '../services/api/user.service';

@Component({
  selector: 'app-account-regis',
  templateUrl: './account-regis.page.html',
  styleUrls: ['./account-regis.page.scss'],
})
export class AccountRegisPage implements OnInit {

  regisForm: FormGroup
  // รับค่าจาก Form
  passwd: string;
  conf_pass: string;
  usr_name: string;
  email_addr: string;
  OTP_num: number;
  // การทำเครื่องหมาย ที่ Aggreement
  agreementAccept: boolean;
  // สถานะการส่ง OTP
  sentOTP = false;

  constructor(
    public formBulider: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userServ: UserService
  ) { 
  }

  ngOnInit() {
  }

  // Submit Register
  onSubmit():any {
    // console.log(this.agreementAccept)
    if (this.passwd != this.conf_pass) {
      console.log("password is not match")
      alert("รหัสผ่านกับรหัสในช่องยืนยันไม่ตรงกัน")
    }
    else if (this.passwd == undefined || this.conf_pass == undefined
    || this.usr_name == undefined || this.email_addr == undefined) {
      alert("คุณยังกรอกข้อมูลไม่ครบ")
    }
    else if (this.OTP_num == undefined ) {
        alert("คุณยังไม่ได้กรอก OTP")
    }
    else if (!this.agreementAccept) {
      console.log("you are not accept agreement")
      alert("คุณยังไม่ได้กดยอมรับข้อตกลงในการใช้งาน")
    }
    else{
      console.log(this.passwd);
      // create form to sent to server
      const registerForm = new FormGroup({
        email: new FormControl(this.email_addr),
        username: new FormControl(this.usr_name),
        password: new FormControl(this.passwd),
        mailotp: new FormControl(this.OTP_num)
      })

      // return respond from server to console
      this.userServ.ReqRegister(registerForm.value)
      .subscribe(() => {
        alert("ลงทะเบียนเสร็จสิ้น โปรดลงชื่อเข้าใช้งาน");
        this.ngZone.run((res?) => {
          if (res != undefined){
            console.log(res)
          }
        this.router.navigateByUrl('/account-login')
        }) 
      },
      (err) => {
        console.log(err)
      })
    }
  }

  // ขอ OTP ส่งไปที่ email
  /* request_OTP(){
    if (this.email_addr != undefined){
      const mail_addr = new FormGroup({
        email: new FormControl(this.email_addr)
      })
      this.userServ.ReqOTP(mail_addr.value)
      .subscribe((res)=>{
        let reply = res
        if (reply.message == 'ok'){
          this.sentOTP = true
        }
        console.log("message from server: " + reply.message)
      })
    }
    else{
      alert('คุณยังไม่ได้กรอกอีเมล์ เพื่อส่ง OTP')
    }
  } */
}
