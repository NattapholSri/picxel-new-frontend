import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { PaymentsService } from 'src/app/services/api/payments.service';
import { UserService } from 'src/app/services/api/user.service';
import { omiseRecipt, recipientDetail } from 'src/app/services/data-model/omise.model';

import { BankNameList } from 'src/app/local-mock-data/banklist';

@Component({
  selector: 'app-add-recipt',
  templateUrl: './add-recipt.page.html',
  styleUrls: ['./add-recipt.page.scss'],
})
export class AddReciptPage implements OnInit {

  bankList = BankNameList

  user_data:any = {}

  reciptData: recipientDetail = {
    name: '',
    email: '',
    type: '',
    bank_account: {
      name:'',
      number:'',
      brand:''
    }
  }

  useDefaultEmail:boolean = true

  constructor(
    private router:Router,
    private ngZone:NgZone,
    private paymentServ:PaymentsService,
    private userServ: UserService,
    private loadingCtrl: LoadingController
  ) {
    this.userServ.AutoLogout()
    let user_id = localStorage.getItem('current_log_uid')
    this.userServ.ReqUserDetail(user_id).subscribe((res) => {
        console.log(res)
        this.user_data = res
        this.changeToDefEmail()
    })  
   }

  ngOnInit() {
  }

  changeToDefEmail(){
    if (this.useDefaultEmail){
      this.reciptData.email = this.user_data.email
    }
    console.log(this.reciptData.email)
  }

  checkMissingField():boolean{
    if (this.reciptData.name == ''|| this.reciptData.email == '' || this.reciptData.type == ''){
      return true
    }
    else if (this.reciptData.bank_account.brand == '' ||
              this.reciptData.bank_account.name == '' ||
              this.reciptData.bank_account.number == ''
    ){
      return true
    }
    else{
      return false
    }
  }

  submit(){
    this.changeToDefEmail()
    if(this.checkMissingField()){
      alert('กรอกข้อมูลไม่ครบ โปรดตรวจสอบ')
    }
    else {
    let sendForm:omiseRecipt = {recipient:this.reciptData}
    console.log(sendForm)
    this.paymentServ.createRecipient(sendForm).subscribe(
      (res) => {
        console.log(res)
        this.reciptData = {name: '',email: '',type: '',
                          bank_account: {name:'',number:'',brand:''}}
        alert('add recipt complete')
        this.ngZone.run(() => this.router.navigateByUrl('/account-edit'))
      },(err) => {
        console.log(err)
        this.reciptData = {name: '',email: '',type: '',
                          bank_account: {name:'',number:'',brand:''}}
        alert('เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ โปรดลองใหม่อีกครั้งหรือลองใหม่ภายหลัง')
      }
    )}
  } 

}
