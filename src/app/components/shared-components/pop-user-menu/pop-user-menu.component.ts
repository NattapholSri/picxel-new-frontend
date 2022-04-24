import { Component, OnInit,NgZone, Input } from '@angular/core';
import { UserService } from 'src/app/services/api/user.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

import { PlanListComponent } from '../../subscription/plan-list/plan-list.component';

@Component({
  selector: 'app-pop-user-menu',
  templateUrl: './pop-user-menu.component.html',
  styleUrls: ['./pop-user-menu.component.scss'],
})
export class PopUserMenuComponent{
  @Input() username:string

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private userServ: UserService,
    private popOverCtrl:PopoverController,
  ) {
  }

  /* ngOnInit(): void {
    this.userServ.ReqUserDetail(this.username).subscribe((res) =>{
      let usr_data = res
      console.log(usr_data)

    })
  } */

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

}
