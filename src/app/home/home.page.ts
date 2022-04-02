import { Component,ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { UserService } from '../services/api/user.service';
import { PostCreateComponent } from '../components/postCRUD/post-create/post-create.component';

import { PopUserMenuComponent } from '../components/shared-components/pop-user-menu/pop-user-menu.component';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(PostCreateComponent) child: PostCreateComponent
   
  tokenOn:boolean

  constructor(
    userServ: UserService,
    private popOverCtrl: PopoverController
    ) {
    userServ.AutoLogout()
    this.tokenOn = localStorage.getItem('jwt') != undefined
  }

  async showUserMenu(){
    console.log('clicked')

    const popover = await this.popOverCtrl.create({
      component: PopUserMenuComponent,
      dismissOnSelect: true,
    });
    await popover.present();
  
    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
