import { Component, Input, NgZone, OnInit } from '@angular/core';
import { SubscriptPlanService } from 'src/app/services/api/subscript-plan.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PaymentsService } from 'src/app/services/api/payments.service';

@Component({
  selector: 'app-user-subscript',
  templateUrl: './user-subscript.component.html',
  styleUrls: ['./user-subscript.component.scss'],
})
export class UserSubscriptComponent implements OnInit {
  @Input() creator_id:string
  @Input() creatorStatus:boolean = true

  currentViewId = localStorage.getItem('current_log_uid')

  planList:any[] = []
  userSub:any = {}
  
  warning_has_sub:boolean

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
          plan.createdAt = createdDate.toLocaleString('th-TH',{year: '2-digit', month: 'narrow', day: '2-digit'})
          
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
        if(res.content != null && res.content != undefined){
          this.userSub = res.content
          let oldFormat = new Date(this.userSub.endDate)
          this.userSub.endDate = oldFormat.toLocaleString('th-TH',{year: '2-digit', month: 'narrow', day: '2-digit'})
          this.warning_has_sub = true  
        }
        else{
          this.userSub = {}
        }
        console.log(this.userSub)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  subscribeToPlan(plan:any){
    localStorage.removeItem('plan-selected')
    localStorage.setItem('plan-selected',JSON.stringify(plan))
    this.ngZone.run(() => this.router.navigateByUrl('/confirm-subscription'))
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

  async showSubdetail(){
    const alert = await this.alertCtrl.create({
      header: 'รายละเอียดของ subscription',
      subHeader: '*ต้องรอ plan นี้หมดอายุก่อน จึงจะทำการ subscription แพลนอื่นได้',
      message:  `วันหมดอายุของ subscription:${this.userSub.endDate}`,
      buttons: ['OK']
    });

    await alert.present();
  }
    

}
