import { Component,NgZone } from '@angular/core';
import { UserService } from 'src/app/services/api/user.service';
import { SubscriptPlanService } from 'src/app/services/api/subscript-plan.service';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.page.html',
  styleUrls: ['./edit-plan.page.scss'],
})
export class EditPlanPage {

  plan:any = {}

  currentUser: string = localStorage.getItem('usr_login')


  price: number
  time: number

  time_type:string


  constructor(
    private userServ: UserService,
    private subPlanServ: SubscriptPlanService,
    public formBulider: FormBuilder,
    private router:Router,
    private ngZone:NgZone) 
    { 
      this.userServ.AutoLogout()
      this.plan = JSON.parse(localStorage.getItem('selected-plan'))
      this.price = this.plan.price
      this.time = this.plan.every
      this.time_type = this.plan.period
    }


  onSubmit(){
    
    if (this.price < 10){
      this.price = 10
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

      let updatePlan_Form = new FormGroup({
        price : new FormControl(this.price),
        every : new FormControl(this.time),
        currency: new FormControl(this.plan.currency),
        period: new FormControl(this.time_type),
        omise_recipient_id: new FormControl()
      })

      console.log(updatePlan_Form.value)
      this.subPlanServ.updatePlan(updatePlan_Form.value)
      .subscribe((res) => {
        alert("plan updated, Back to your detail page")
        console.log(res)
      
      //clear Data on Post box
        //this.ngZone.run(() => this.router.navigateByUrl('/account-detail/'+this.currentUser))
        localStorage.removeItem('selected-plan')
        this.ngZone.run(() => this.router.navigateByUrl('/account-edit'))
      },
      (err) => {
        console.log(err)
      })
    //}
  }

  cancelCreate(){
    localStorage.removeItem('selected-plan')
    this.ngZone.run(() => this.router.navigateByUrl('/account-edit'))
  }
}
