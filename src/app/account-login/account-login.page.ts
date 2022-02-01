import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { UserService } from '../services/api/user.service';

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
  }

  onSubmit():any {
    // console.log(this.agreementAccept)
      const loginForm = new FormGroup({
        username: new FormControl(this.usr_name),
        password: new FormControl(this.passwd)
      })

      this.userServ.ReqLogin(loginForm.value)
      .subscribe((res) => {
        console.log(res)
        localStorage.setItem('jwt', JSON.stringify(res))
        localStorage.setItem('usr_acc',this.usr_name)
        this.ngZone.run(() => this.router.navigateByUrl('/account-detail/1'))
      },
      (err) => {
        console.log(err)
      })
    
  }

}
