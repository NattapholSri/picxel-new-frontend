import { Component, Input, NgZone, OnInit } from '@angular/core';
import { SubscriptPlanService } from 'src/app/services/api/subscript-plan.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PaymentsService } from 'src/app/services/api/payments.service';
import { subScriptionData } from 'src/app/services/data-model/subscription.model';

@Component({
  selector: 'app-user-subscript',
  templateUrl: './user-subscript.component.html',
  styleUrls: ['./user-subscript.component.scss'],
})
export class UserSubscriptComponent implements OnInit {
  @Input() creator_id:string

  currentViewId = localStorage.getItem('current_log_uid')

  planList:any[] = []
  userSub:any = {} 

  constructor(
    private subPlanServ:SubscriptPlanService,
    private alertCtrl:AlertController,
    private router: Router,
    private ngZone:NgZone,
    private paymentServ: PaymentsService
  )  {
  }

  ngOnInit() {
    console.log(this.creator_id)
    this.subPlanServ.searchPlan(this.creator_id).subscribe((res) =>{
      console.log(res)
      this.planList = res.content
      if (this.planList.length != 0){
        for (let plan of this.planList){
          let createdDate = new Date(plan.createdAt)
          plan.createdAt = createdDate.toLocaleString('th-TH',{year: 'numeric', month: 'long', day: 'numeric'})
          
        }
      }
    },(err) =>{
      console.log(err)
    })

    this.checkSubscribe(this.currentViewId,this.creator_id)

  }

  checkSubscribe(user_id:string,creator_id:string){
    this.subPlanServ.searchSubscription(user_id,creator_id).subscribe(
      (res) => {
        console.log(res)
        if( res.content != null && res.content != undefined){
          this.userSub = res.content
        }
      },
      (err) => {
        console.log(err)
      }
    )
  }

 /*  setCardId(card_id_input:string){
    this.card_id = card_id_input
    console.log('selected card id: '+this.card_id)
  } */

  subscribeToPlan(plan:any){
    localStorage.removeItem('plan-selected')
    localStorage.setItem('plan-selected',JSON.stringify(plan))
    this.ngZone.run(() => this.router.navigateByUrl('/confirm-subscription'))
   /*  let quickForm:subScriptionData = {
      planId:plan._id

    }
    console.log(quickForm)
    this.subPlanServ.createSubscription(quickForm).subscribe((res) => {
      console.log(res)
    },(err) => console.log(err)
    ) */
  }

  unSubscribe(){
    let quickForm = {subId:this.userSub._id}
    console.log(quickForm)
    this.subPlanServ.deleteSubscription(quickForm).subscribe((res) => {
      console.log(res)
      this.userSub = {}
    },(err) => console.log(err)
    )
  }

  /* async attentionSub(plan:any){
    if (this.card_id == undefined || this.card_id == ''){
      alert('โปรดเลือกบัตรเครดิตที่ต้องการชำระ')
    }
    else{
      const alert = await this.alertCtrl.create({
      header: 'ยืนยันในการชำระเงิน',
      message: `คุณจะต้องจ่ายเงินทั้งหมดจำนวน${this.round * plan.price}`,
      buttons: [
        {
        text: 'ยกเลิก',
        role: 'cancel'
        },{
          text: 'ยืนยัน',
          handler: () => {
            this.subscribeToPlan(plan)
          }
        } ,{
          text: 'จัดการบัตรเครดิต',
          handler: () => {
            this.ngZone.run(() => this.router.navigateByUrl('/view-credit-card/'+this.customer))
          }
        }
      ]
    });
    await alert.present();
    }
  } */
    

}
