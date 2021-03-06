import { Component } from '@angular/core';
import { SubscriptPlanService } from 'src/app/services/api/subscript-plan.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss'],
})
export class PlanListComponent {

  planList:any[] = []

  constructor(
    private subPlanServ:SubscriptPlanService,
    private alertCtrl:AlertController,
    private router: Router,
  ) { 
    this.subPlanServ.searchPlan(localStorage.getItem('current_log_uid')).subscribe((res) => {
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
      }
    )
  }

  private deletePlanFromList(plan:any){
    for( var i = 0; i < this.planList.length; i++){                               
      if ( this.planList[i] === plan) { 
        this.planList.splice(i, 1); 
        i--; 
      }
    }
  }

  goToEditPlan(plan:any){
    localStorage.setItem('selected-plan',JSON.stringify(plan))
    this.router.navigateByUrl('/edit-plan/'+plan._id)
  }

  goToCreatePlan(){
    this.router.navigateByUrl('/create-plan')
  }

  async deletePlan(plan:any){
    console.log('deleting plan: ' + plan._id)
    await this.alertCtrl.create(
      {header: 'ลบ plan นี้?',
      message: 'คุณแน่ใจแล้วใช่ไหม (การลบ plan จะไม่ทำให้ผู้ใช้ที่ทำการ subscription plan นี้อยู่เดิม ยกเลิกการ subscription)',
      buttons: [
        {
        text: 'ยกเลิก',
        role: 'cancel'
        },{
          text: 'แน่นอน',
          handler: () => {
            this.subPlanServ.deletePlan(plan._id).subscribe((res) =>{
              console.log(res)
              this.deletePlanFromList(plan)
            },(err) => console.log(err))
          }
        }]
      }
    ).then(alertEl =>{
      alertEl.present()
    })
  }
  
  

}
