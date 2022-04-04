import { Component, NgZone } from '@angular/core';
import { UserService } from 'src/app/services/api/user.service';
import { SubscriptPlanService } from 'src/app/services/api/subscript-plan.service';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.page.html',
  styleUrls: ['./create-plan.page.scss'],
})
export class CreatePlanPage {

  currentUser: string = localStorage.getItem('usr_login')

  plan_name: string

  price: number = 10
  month: number = 6

  constructor(
    private userServ: UserService,
    private subPlanServ: SubscriptPlanService,
    public formBulider: FormBuilder,
    private router:Router,
    private ngZone:NgZone) { 
      this.userServ.AutoLogout()
    }


  onSubmit(){
    if(this.plan_name == '' || this.plan_name == undefined){
      alert('ยังไม่ได้ตั้งชื่อ Plan')
      console.log('exited submit function')
    }
    else{
      let planForm = new FormGroup({
        plan_name: new FormControl(this.plan_name),
        price : new FormControl(this.price),
        monthCount : new FormControl(this.month),
      })
      console.log(planForm.value)
      this.subPlanServ.createPlan(planForm.value)
      .subscribe((res) => {
        alert("plan created, Back to your detail page")
        console.log(res)
      
      //clear Data on Post box
        this.ngZone.run(() => this.router.navigateByUrl('/account-detail/'+this.currentUser))
      },
      (err) => {
        console.log(err)
      })
    }
  }

  cancelCreate(){
    this.ngZone.run(() => this.router.navigateByUrl('/account-edit'))
  }

}
