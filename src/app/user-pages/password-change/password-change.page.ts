import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';

import { UserService } from '../../services/api/user.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.page.html',
  styleUrls: ['./password-change.page.scss'],
})
export class PasswordChangePage implements OnInit {

  usr_acc: any = {};
  knowUser = false;
  user_id: string = localStorage.getItem('usr_login')
  subbed = false;
  currentUserLogin = localStorage.getItem('current_log_uid')

  old_passwd: string
  new_passwd: string
  conf_new_passwd: string

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private userServ: UserService,
    public formBulider: FormBuilder,
  ) {
    this.userServ.AutoLogout()
    this.userServ.ReqUserDetail(this.user_id).subscribe((res) => {
      this.usr_acc = res
      console.log(this.usr_acc)
      if (this.usr_acc.password == undefined && localStorage.getItem('jwt') == undefined){
        alert('Token timeout . Take you Back to login page')
        this.router.navigateByUrl(`/account-detail/${this.user_id}`)
      }
      else if (this.usr_acc.password != undefined && localStorage.getItem('jwt') != undefined ){
        console.log('data check passed!')
        console.log(this.usr_acc.password)
      }
      else{
        alert('Internal Error. Take you Back to your detail page')
        this.router.navigateByUrl(`/account-detail/${this.user_id}`)
      }
    },(err) => {
      alert('Internal Error. Take you Back to your detail page')
      this.router.navigateByUrl(`/account-detail/${this.user_id}`)
    })
   }

  ngOnInit() {
  }

  checkEditData(){
    if ((this.old_passwd == this.usr_acc.password) && (this.conf_new_passwd == this.new_passwd)){
      this.changePasswd()
    }
    else if (this.old_passwd != this.usr_acc.password){
      alert('กรอกรห้สผ่านเดิมไม่ถูกต้อง')
    }
    else if (this.conf_new_passwd != this.new_passwd){
      alert('กรอกรห้สผ่านใหม่ไม่ตรงกับรัสในช่องยืนยันรหัสผ่านใหม่')
    }
    else{
      alert('เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ')
    }
  }

  changePasswd(){
    
    const editForm = new FormGroup({
      password: new FormControl(this.new_passwd, Validators.required),
    })

    console.log(editForm.value)
    this.userServ.updateUserData(editForm.value)
      .subscribe((res) => {
        console.log(res)
        alert('แก้ไขสำเร็จ กลับไปที่หน้าโปรไฟล์')
        this.ngZone.run(() => this.router.navigateByUrl('/account-detail/'+this.user_id))
      },
      (err) => {
        console.log(err)
        alert('แก้ไขไม่สำเร็จ')
      })
  }

  revert(){
    this.ngZone.run(() => this.router.navigateByUrl('/account-detail/'+this.user_id))
  }

}
