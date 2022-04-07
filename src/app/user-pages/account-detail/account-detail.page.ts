import { Component, OnInit,NgZone,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/api/user.service';
import { FollowUserService } from 'src/app/services/api/follow-user.service';
import { PostingService } from 'src/app/services/api/posting.service';

import { AlertController,PopoverController } from '@ionic/angular';
import { PostViewComponent } from 'src/app/components/postCRUD/post-view/post-view.component';

import { PopUserMenuComponent } from 'src/app/components/shared-components/pop-user-menu/pop-user-menu.component';
import { UserSubscriptComponent } from 'src/app/components/subscription/user-subscript/user-subscript.component';


@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.page.html',
  styleUrls: ['./account-detail.page.scss'],
})
export class AccountDetailPage implements OnInit {
  @ViewChild(PostViewComponent) child: PostViewComponent 

  usr_acc: any = {}; // this user
  token = localStorage.getItem('jwt');
  knowUser = false;
  user_id: string; // this username
  subbed = false;
  currentUserLogin = localStorage.getItem('current_log_uid')
  currentUserName = localStorage.getItem('usr_login')

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private userServ: UserService,
    private activatedRt: ActivatedRoute,
    private alertCtrl: AlertController,
    private followUsr: FollowUserService,
    private postServ: PostingService,
    private popOverCtrl: PopoverController
  ) {
    localStorage.removeItem('loaduserID') 
    localStorage.removeItem('usernow')
    this.user_id = this.activatedRt.snapshot.paramMap.get('username')
    localStorage.setItem('loaduserID',this.user_id)
    this.userServ.ReqUserDetail(this.user_id).subscribe((res) => {
      let stringJSON = JSON.stringify(res)
      localStorage.setItem('usernow',stringJSON)
      this.usr_acc = res
      console.log(this.usr_acc)
      if (
        (this.usr_acc.followerCount != 0) &&
        (this.currentUserLogin != undefined) &&
        (this.currentUserLogin != this.usr_acc._id)
      ){
        console.log('load Follow state')
        this.getFollowState()
      }
      else{
        console.log('skip loading follow state')
      }
    },(err) => {
      alert('Oh no! this user not exist. Taking you back to your user detail')
      let main_user = localStorage.getItem('usr_login')
      this.router.navigateByUrl(`/account-detail/${main_user}`)
    })
  }

  ngOnInit() {
    this.userServ.AutoLogout()
    
    console.log(localStorage.getItem('tkTime'))
  }


  deleteAccount(){
    // deletion methods
    console.log(this.usr_acc._id)
    this.alertCtrl.create(
      {header: 'คุณแน่ใจแล้วใช่ไหม',
      message: 'การลบบัญชีผู้ใช้ ระบบจะทำการลบข้อมูลทั้งหมดที่เกี่ยวข้องกับบัญชีนี้ และไม่สามารถกู้คืนข้อมูลได้',
      buttons: [
        {
        text: 'ยกเลิก',
        role: 'cancel'
        },{
          text: 'แน่นอน',
          handler: () => {
            this.postServ.DeleteAllPost(this.usr_acc._id).subscribe((res) => {
              console.log(res)
              this.userServ.deleteUser()
                .subscribe((res)=> {
                  console.log(res)
                  this.ngZone.run(() => this.router.navigateByUrl('/'))
                })
              
            })
          }
        }
      ]
      }
    ).then(alertEl =>{
      alertEl.present()
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

  getFollowState(){
    if (this.usr_acc.password == undefined && this.token != undefined){
      // console.log('login user ' + this.currentUserLogin)
      // console.log('this user ' + this.usr_acc._id)
      this.followUsr.FollowToUser(this.currentUserLogin,this.usr_acc._id).subscribe((res)=>{
        console.log(res)
        /* for (let list of res.content){
          if (list.to == this.usr_acc._id){
            console.log('followed user')
            this.subbed = true
          } 
        } */
        if (res.content != undefined && res.content != null){
          this.subbed = true
        }
      },(err) => console.log(err))
    }
  }

  followToThisUserToggle(){
    let userFollowIdForm = {
      userId: this.usr_acc._id
    }
    this.followUsr.followToUser(userFollowIdForm)
    .subscribe(
      (res) => {
        console.log(res)
        this.subbed = true
        location.reload()
      },
      (err) => console.log(err)
    )
  }

  clearAllPost(){
    this.postServ.DeleteAllPost(this.usr_acc._id).subscribe((res) => {
      console.log(res)
    })
  }

  async showUserMenu(){
    console.log('clicked')

    const popover = await this.popOverCtrl.create({
      component: PopUserMenuComponent,
      dismissOnSelect: true,
      componentProps: { username :this.currentUserName }
    });
    await popover.present();
  
    const { role } = await popover.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

  async showSubscriptMenu(){
    console.log('clicked')

    const popover = await this.popOverCtrl.create({
      component: UserSubscriptComponent,
      dismissOnSelect: true,
      componentProps: { creatorId :this.usr_acc._id }
    });
    await popover.present();
  
    // console.log('onDidDismiss resolved with role', role);
  }
}
