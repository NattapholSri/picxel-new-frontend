import { Component, NgZone } from '@angular/core';
import { UserService } from 'src/app/services/api/user.service';
import { SubscriptPlanService } from 'src/app/services/api/subscript-plan.service';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { PaymentsService } from 'src/app/services/api/payments.service';
import { planData } from 'src/app/services/data-model/subscription.model';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.page.html',
  styleUrls: ['./create-plan.page.scss'],
})
export class CreatePlanPage {

  currentUser: string = localStorage.getItem('usr_login')

  plan_name: string

  price: number = 100
  time: number = 6

  time_type:string = 'month'
  user_data:any = {}

  omise_resp_id:string

  recipt_list:any[] = []
  submitDisable:boolean = false

  codeNoAccount:number = 0
  disableMessage:string

  constructor(
    private userServ: UserService,
    private subPlanServ: SubscriptPlanService,
    public formBulider: FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private paymentServ:PaymentsService,
    private toastCtrl:ToastController
    ) { 
      this.userServ.AutoLogout()
      let user_id = localStorage.getItem('current_log_uid')
      this.userServ.ReqUserDetail(user_id).subscribe((res) => {
        console.log(res)
        this.user_data = res
      })
      if (localStorage.getItem('current_omise_customer') != undefined) {
        this.paymentServ.getCustomerReciptInfo().subscribe(
        (res) => {
          console.log(res.customer.metadata.recipients)
          let recipt_data = res.customer.metadata.recipients
          let recipt_key = Object.keys(recipt_data)
          if (recipt_key.length === 0){
            this.disableMessage = 'ไม่มีบัญชีรับเงินที่ใช้ได้ กรุณาเพิ่มบัญชีก่อน'
            this.warningNoAccount(1)
            this.submitDisable = true
          }
          console.log(recipt_key)
          for (let key of recipt_key){
            this.paymentServ.getRecipientInfo(key).subscribe(
              (res) =>{
                console.log(res.resp)
                let original_text:string = res.resp.bank_account.bank_code
                res.resp.bank_account.bank_code = original_text.toUpperCase()
                this.recipt_list.push(res.resp)
              }
            )
          }
        },(err) => {
          this.warningNoAccount(1)
          this.submitDisable = true
        })
      }
      else{
        console.log('no omise id')
        this.warningNoAccount(2)
        this.submitDisable = true
        this.disableMessage = 'ยังไม่ได้สมัครบริการชำระเงิน โปรดทำการสมัครในเมนูตั้งค่าผู้ใช้'
      }

  }


  onSubmit(){

      if (this.price < 25){
        this.price = 25
      }
      else if(this.price > 1000){
        this.price = 1000
        alert('plan มีราคาเกินกำหนด ราคาของ plan จะถูกปรับมาลงที่ 1000 บาท/เดือน')
      }
      //plan's duration
      if(this.time < 1){
        this.time = 1
      }
      else if(this.time > 30){
        this.time = 30
        alert('plan มีระยะเวลาเกินกำหนด ระยะเวลาของ plan จะถูกปรับมาลงที่ค่าสูงสุดที่สามารถกำหนดได้')
      }

      if (this.omise_resp_id != undefined && this.omise_resp_id != ''){
        let planForm:planData = ({
        price : this.price,
        every : this.time,
        currency: 'THB',
        period: this.time_type,
        omise_recipient_id: this.omise_resp_id
      })
        console.log(planForm)
        this.subPlanServ.createPlan(planForm)
        .subscribe((res) => {
          alert("plan created, Back to your detail page")
          console.log(res)
      
        //clear Data on Post box
          this.ngZone.run(() => this.router.navigateByUrl('/account-detail/'+this.currentUser))
          //this.ngZone.run(() => this.router.navigateByUrl('/account-edit'))
        },
        (err) => {
          console.log(err)
        })
      }
      else{
        alert('missing recipient id')
      }
    //}
  }

  async warningNoAccount(code:number) {
    if (code == 1){
      const toast = await this.toastCtrl.create({
      message: 'ไม่มีบัญชีรับเงินที่ใช้ได้ กรุณาเพิ่มบัญชีก่อน',
      duration: 5000
      });
      toast.present();
      
    }
    else if (code == 2){
      const toast = await this.toastCtrl.create({
      message: 'ยังไม่ได้สมัครบริการชำระเงิน โปรดทำการสมัครในเมนูตั้งค่าผู้ใช้',
      duration: 5000
      });
      toast.present();
      
    }
  }


  cancelCreate(){
    if (this.submitDisable){
      this.ngZone.run(() => this.router.navigateByUrl('/account-edit'))
    }
    else{
      this.ngZone.run(() => this.router.navigateByUrl('/account-detail/'+ this.currentUser))
    }
  }

}
