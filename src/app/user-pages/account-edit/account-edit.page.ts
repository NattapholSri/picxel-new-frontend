import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { UserService } from '../../services/api/user.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.page.html',
  styleUrls: ['./account-edit.page.scss'],
})
export class AccountEditPage implements OnInit {

  gender: string;
  picture_url: string;
  firstname: string;
  user_now: string;
  username: string;

  constructor(
    public formBulider: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userServ: UserService,
  ) { 
    this.user_now = localStorage.getItem('usr_login')
    this.userServ.ReqUserDetail(this.user_now)
      .subscribe((res) => {
        let usr_data = res
        console.log(usr_data)
        if (usr_data.gender != undefined){
          this.gender = usr_data.gender
        }
        if (usr_data.profile_pic != undefined){
          this.picture_url = usr_data.profile_pic
        }
        if (usr_data.firstname != undefined){
          this.firstname = usr_data.firstname
        }
      })
  }

  ngOnInit() {
  }

  updateAll(){
    const editForm = new FormGroup({
      gender: new FormControl(this.gender, Validators.required),
      profile_pic: new FormControl(this.picture_url, Validators.required),
      firstname: new FormControl(this.firstname, Validators.required)
    })

    console.log(editForm.value)
    this.userServ.updateUserData(editForm.value)
      .subscribe((res) => {
        console.log(res)

        this.ngZone.run(() => this.router.navigateByUrl('/account-detail/'+this.user_now))
      },
      (err) => {
        console.log(err)
        alert('แก้ไขไม่สำเร็จ')
      })
  }

  revert(){
    this.ngZone.run(() => this.router.navigateByUrl('/account-detail/'+this.user_now))
  }



}
