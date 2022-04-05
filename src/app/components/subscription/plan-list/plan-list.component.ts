import { Component, Input} from '@angular/core';
import { SubscriptPlanService } from 'src/app/services/api/subscript-plan.service';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss'],
})
export class PlanListComponent {

  planList:any[] = []

  constructor(
    private subPlanServ:SubscriptPlanService,
    private userServ: UserService
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


}
