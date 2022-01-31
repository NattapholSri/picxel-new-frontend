import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';;

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.page.html',
  styleUrls: ['./account-login.page.scss'],
})
export class AccountLoginPage implements OnInit {

  passwd: string;
  conf_pass: string;
  usr_name: string;

  constructor(
    public formBulider: FormBuilder,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
  }

  onSubmit():any {
    // console.log(this.agreementAccept)
    if (this.passwd != this.conf_pass) {
      console.log("password is not match")
      //return res
    }
    else{
      const loginForm = new FormGroup({
        username: new FormControl(this.usr_name),
        password: new FormControl(this.passwd)
      })
      console.log(loginForm.value);
    }
  }

}
