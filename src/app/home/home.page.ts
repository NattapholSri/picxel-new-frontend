import { Component,ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { UserService } from '../services/api/user.service';
import { PostCreateComponent } from '../components/postCRUD/post-create/post-create.component';

import { PopUserMenuComponent } from '../components/shared-components/pop-user-menu/pop-user-menu.component';
import { MenuController } from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(PostCreateComponent) child: PostCreateComponent
   
  tokenOn:boolean
  currentUserName = localStorage.getItem('usr_login')

  constructor(
    userServ: UserService,
    private popOverCtrl: PopoverController,
    private menuCtrl: MenuController
    ) {
    userServ.AutoLogout()
    this.tokenOn = localStorage.getItem('jwt') != undefined
  }

  async showUserMenu(){
    console.log('clicked')

    const popover = await this.popOverCtrl.create({
      component: PopUserMenuComponent,
      dismissOnSelect: true,
      componentProps: { username :this.currentUserName }
    });
    await popover.present();
  }

  async showNewUserMenu(){
    await this.menuCtrl.open('end');
  }


  refreshThisPage(event){
    console.log('Begin async operation');

    setTimeout(() => {
      location.reload();
      event.target.complete();
    }, 1000);
  }
}
