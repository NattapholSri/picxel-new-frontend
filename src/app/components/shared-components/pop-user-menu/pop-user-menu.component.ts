import { Component, OnInit,NgZone, Input } from '@angular/core';
import { UserService } from 'src/app/services/api/user.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

import { PlanListComponent } from '../../subscription/plan-list/plan-list.component';
import { ManageOmiseComponent } from '../../subscription/manage-omise/manage-omise.component';

@Component({
  selector: 'app-pop-user-menu',
  templateUrl: './pop-user-menu.component.html',
  styleUrls: ['./pop-user-menu.component.scss'],
})
export class PopUserMenuComponent implements OnInit{
  @Input() username:string
  @Input() user_page_name:string

  user_omise_id:string

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private userServ: UserService,
    private popOverCtrl:PopoverController,
  ) {

  }

  ngOnInit() {
    this.userServ.ReqUserDetail(this.username)
      .subscribe((res) => {
        let usr_data = res
        if (usr_data.omise_customer_id != undefined){
          this.user_omise_id = usr_data.omise_customer_id
        }
        else{
          this.user_omise_id = undefined
        }
      })
  }

  userLogout(){
    this.userServ.ReqLogout() 
    .subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )

    this.ngZone.run(() => this.router.navigateByUrl('/'))
  }

  gotoEditPage(){
    this.ngZone.run(() => this.router.navigateByUrl('/account-edit'))
  }

  async callPlanList(){

    const popover = await this.popOverCtrl.create({
      component: PlanListComponent,
      dismissOnSelect: true,
      mode: "md",
    });
    await popover.present();
  }

  async callPaymentServ(){

    const popover = await this.popOverCtrl.create({
      component: ManageOmiseComponent,
      dismissOnSelect: true,
      componentProps: { customer : this.user_omise_id },
      mode: "md",
    });
    await popover.present();
  }

}
