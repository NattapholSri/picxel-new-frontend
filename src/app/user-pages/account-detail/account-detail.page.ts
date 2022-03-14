import { Component, OnInit,NgZone,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/api/user.service';
import { FollowUserService } from 'src/app/services/api/follow-user.service';

import { AlertController } from '@ionic/angular';
import { PostViewComponent } from 'src/app/components/postCRUD/post-view/post-view.component';
import { PostingService } from 'src/app/services/api/posting.service';


@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.page.html',
  styleUrls: ['./account-detail.page.scss'],
})
export class AccountDetailPage implements OnInit {
  @ViewChild(PostViewComponent) child: PostViewComponent 

  usr_acc: any = {};
  token = localStorage.getItem('jwt');
  jsonToken = JSON.parse(this.token);
  knowUser = false;
  user_id: string;
  isUser = false;
  subbed = false;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private userServ: UserService,
    private activatedRt: ActivatedRoute,
    private alertCtrl: AlertController,
    private followUsr: FollowUserService,
    private postServ: PostingService
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
    },(err) => {
      alert('Oh no! this user not exist. Taking you back to your user detail')
      let main_user = localStorage.getItem('usr_login')
      this.router.navigateByUrl(`/account-detail/${main_user}`)
    }
    )
  }

  ngOnInit() {
    /* console.log(this.user_id)
    this.usr_acc = JSON.parse(localStorage.getItem('usernow')) */
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
                .subscribe((res)=> console.log(res))
              this.ngZone.run(() => this.router.navigateByUrl('/'))
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


  followToThisUser(){
    let userFollowIdForm = {
      userId: this.usr_acc._id
    }
    this.followUsr.followToUser(userFollowIdForm)
    .subscribe(
      (res) => {
        console.log(res)
        this.subbed = true
      },
      (err) => console.log(err)
    )
  }

  unFollowToThisUser(){
    let userFollowIdForm = {
      userId: this.usr_acc._id
    }
    this.followUsr.followToUser(userFollowIdForm)
    .subscribe(
      (res) => {
        console.log(res)
        this.subbed = false
      },
      (err) => console.log(err)
    )
  }
}
