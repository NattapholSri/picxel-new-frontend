import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';;

@Component({
  selector: 'app-account-regis',
  templateUrl: './account-regis.page.html',
  styleUrls: ['./account-regis.page.scss'],
})
export class AccountRegisPage implements OnInit {

  passwd: string;
  conf_pass: string;
  usr_name: string;
  email_addr: string;
  agreementAccept: boolean;

  constructor(
    public formBulider: FormBuilder,
    private router: Router,
    private ngZone: NgZone
  ) { 
  }

  ngOnInit() {
  }

  onSubmit():any {
    // console.log(this.agreementAccept)
    if (this.passwd != this.conf_pass) {
      console.log("password is not match")
      alert("รหัสผ่านกับรหัสในช่องยืนยันไม่ตรงกัน")
    }
    else if (!this.agreementAccept) {
      console.log("you are not accept agreement")
      alert("คุณยังไม่ได้กดยอมรับข้อตกลงในการใช้งาน")
    }
    else{
      console.log(this.passwd);
      const registerForm = new FormGroup({
        email: new FormControl(this.email_addr),
        username: new FormControl(this.usr_name),
        password: new FormControl(this.passwd)
      })
      console.log(registerForm.value);
    }
  }

}
