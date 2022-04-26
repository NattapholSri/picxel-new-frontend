import { Component, NgZone, OnInit } from '@angular/core';
import { SubscriptPlanService } from 'src/app/services/api/subscript-plan.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PaymentsService } from 'src/app/services/api/payments.service';
import { subScriptionData } from 'src/app/services/data-model/subscription.model';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-confirm-subscription',
  templateUrl: './confirm-subscription.page.html',
  styleUrls: ['./confirm-subscription.page.scss'],
})
export class ConfirmSubscriptionPage implements OnInit {

  round:number = 1
  card_list:any[] =[]

  card_id:string

  selected_plan:any ={}

  constructor(
    private subPlanServ:SubscriptPlanService,
    private alertCtrl:AlertController,
    private router: Router,
    private ngZone:NgZone,
    private paymentServ: PaymentsService,
    private userServ:UserService
  ) {
    this.userServ.AutoLogout()
    this.selected_plan = JSON.parse(localStorage.getItem('plan-selected')) 

    this.paymentServ.listCustomerCard().subscribe(
      (res) => {
        console.log(res.list.data)
        this.card_list = res.list.data
      }
    )
  }

  ngOnInit() {
  }

  setCardId(card_id_input:string){
    this.card_id = card_id_input
    console.log('selected card id: '+this.card_id)
  }

  subscribeToPlan(plan:any){
    let quickForm:subScriptionData = {
      planId:plan._id,
      cardId:this.card_id,
      reCount:this.round
    }
    console.log(quickForm)
    this.subPlanServ.createSubscription(quickForm).subscribe((res) => {
      console.log(res)
      alert('subscription successful! back to last user that you view on.')
      let lastUserVisit = JSON.parse(localStorage.getItem('usernow'))
      this.ngZone.run(() => this.router.navigateByUrl('/account-detail/'+lastUserVisit.username))
    },(err) => console.log(err)
    )
  }

  async attentionSub(plan:any){
    if (this.card_id == undefined || this.card_id == ''){
      alert('โปรดเลือกบัตรเครดิตที่ต้องการชำระ')
    }
    else if(this.round < 1){
      alert('จำนวนเลขรอบในการ subscribe ไม่ถูกต้อง')
    }
    else{
      const alert = await this.alertCtrl.create({
      header: 'ยืนยันในการชำระเงิน',
      message: `คุณจะต้องจ่ายเงินทั้งหมดจำนวน ${this.round * plan.price /100} บาท ต้องการดำเนินการต่อใช่หรือไม่`,
      buttons: [
        {
        text: 'ยกเลิก',
        role: 'cancel'
        },{
          text: 'ยืนยัน',
          handler: () => {
            this.subscribeToPlan(plan)
          }
        }
      ]
    });
    await alert.present();
    }
  }

  revert(){
    let lastUserVisit = JSON.parse(localStorage.getItem('usernow'))
    this.ngZone.run(() => this.router.navigateByUrl('/account-detail/'+lastUserVisit.username))
  }

}
