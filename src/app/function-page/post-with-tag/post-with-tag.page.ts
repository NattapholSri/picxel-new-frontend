import { Component, OnInit,NgZone } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/api/user.service';
import { FollowUserService } from 'src/app/services/api/follow-user.service';
import { PostingService } from 'src/app/services/api/posting.service';

import { AlertController,PopoverController } from '@ionic/angular';
import { TagService } from 'src/app/services/api/tag.service';

import { PopUserMenuComponent } from 'src/app/components/shared-components/pop-user-menu/pop-user-menu.component';


@Component({
  selector: 'app-post-with-tag',
  templateUrl: './post-with-tag.page.html',
  styleUrls: ['./post-with-tag.page.scss'],
})
export class PostWithTagPage implements OnInit {

 tokenOn:boolean
  currentUserName = localStorage.getItem('usr_login') 

  tag_category:string = ''

  category_descript:string = ""

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private userServ: UserService,
    private activatedRt: ActivatedRoute,
    private alertCtrl: AlertController,
    private postServ: PostingService,
    private popOverCtrl: PopoverController,
    private tagServ: TagService
  ) {
    this.tokenOn = localStorage.getItem('jwt') != undefined
    this.tag_category = this.activatedRt.snapshot.paramMap.get('tagname')
    this.tagServ.SearchTag(this.tag_category).subscribe(
      (res) => {
        let output:any[] = res.content
        for (let tag of output){
          if (tag._id == this.tag_category){
            this.category_descript = tag.description
          }
        }
      },(err) => console.log(err)
    )

  }

  ngOnInit() {
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


  refreshThisPage(event){
    console.log('Begin async operation');

    setTimeout(() => {
      location.reload();
      event.target.complete();
    }, 1000);
  }
  

}
