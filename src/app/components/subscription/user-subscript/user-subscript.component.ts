import { Component, Input, NgZone } from '@angular/core';
import { SubscriptPlanService } from 'src/app/services/api/subscript-plan.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-subscript',
  templateUrl: './user-subscript.component.html',
  styleUrls: ['./user-subscript.component.scss'],
})
export class UserSubscriptComponent {
  @Input() creatorId:string

  currentViewId = localStorage.getItem('current_log_uid')

  planList:any[] = []
  userSub:any = {} 

  constructor(
    private subPlanServ:SubscriptPlanService,
    private alertCtrl:AlertController,
    private router: Router,
  )  {
    this.subPlanServ.searchPlan(this.creatorId).subscribe((res) =>{
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

    this.checkSubscribe(this.currentViewId,this.creatorId)
  }

  checkSubscribe(user_id:string,creator_id:string){
    this.subPlanServ.searchSubscription(user_id,creator_id).subscribe(
      (res) => {
        console.log(res)
        this.userSub = res.content
      },
      (err) => {
        console.log(err)
      }
    )
  }

  subscribeToPlan(plan:any){
    let quickForm = {planId:plan._id}
    this.subPlanServ.createSubscription(quickForm).subscribe((res) => {
      console.log(res)
    },(err) => console.log(err)
    )
  }

  unSubscribe(){
    let quickForm = {subId:this.userSub._id}
    this.subPlanServ.createSubscription(quickForm).subscribe((res) => {
      console.log(res)
    },(err) => console.log(err)
    )
  }

}
