import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostingService } from 'src/app/services/api/posting.service';
import { TagService } from 'src/app/services/api/tag.service';
import { UserService } from 'src/app/services/api/user.service';
import { AlertController,PopoverController } from '@ionic/angular';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';

import { BuyPostComponent } from '../shared-components/buy-post/buy-post.component';



@Component({
  selector: 'app-random-all-post',
  templateUrl: './random-all-post.component.html',
  styleUrls: ['./random-all-post.component.scss'],
})
export class RandomAllPostComponent {

  currentUser = localStorage.getItem('usr_login')
  postList: any[] = []
  knowtag: any[] = []
  postOfUser: string
  
  CurrentSessionId: any = localStorage.getItem('current_log_uid')
  loadPostAtPage: number
  canloadMore = true

  constructor(
    private router: Router,
    private PostServ: PostingService,
    private tagServ: TagService,
    private userServ: UserService,
    private alertCtrl: AlertController,
    private popOverCtrl:PopoverController,
  ) {
      this.loadPostAtPage = 1
      this.loadAllTag()
      this.knowtag = JSON.parse(localStorage.getItem('knowtag'))
      if (localStorage.getItem("jwt") != undefined){
        this.randomPost()
      }
      else{
        this.canloadMore = false
      }
      console.log(this.CurrentSessionId)
  }

  randomPost(){
    this.PostServ.LoadRandomPost().subscribe((res) =>{
      this.postList = []
      console.log(res)
      this.postList = res.content
      this.Post_Edit()
    },(err) => {
      console.log(err)
      this.canloadMore = false
    })
  }

  private Post_Edit(){
    for (let post of this.postList ){
        this.userServ.ReqUserDetail(post.userId).subscribe(
          (res) => {
            post.userName = res.username
            post.userPic = res.profile_pic
          }
        )

      let localDate = new Date(post.createdAt)
      post.createdAt = localDate.toLocaleString('th-TH',{year: 'numeric', month: 'short', day: 'numeric',hour:'numeric',minute:'numeric'})
      let updateDate = new Date(post.updatedAt)
      post.updatedAt = updateDate.toLocaleString('th-TH',{year: 'numeric', month: 'short', day: 'numeric',hour:'numeric',minute:'numeric'})

      if (post.likeCount != 0 && this.CurrentSessionId != undefined){
        console.log('load user who like this post: ' + post._id)
        // let userWhoLikePost:any[] = []
        post.thisUserLike = false
        this.PostServ.UserLikeOnPost(this.CurrentSessionId,post._id).subscribe(
          (res) => {
            if (res.content != null && res.content != undefined){
              if (res.content.userId == this.CurrentSessionId){
                post.thisUserLike = true
            } 
          }
        },(err) => {
          console.log(err)
        })
      }
    }
  }

  loadAllTag(){
    this.tagServ.GetAll().subscribe(
      (res) => {
        localStorage.setItem('knowtag',JSON.stringify(res.content))
        this.knowtag = res.content
      }
    )
  }

  deletePost(post_id:string){
    const sendForm = new FormGroup({
      postId: new FormControl(post_id)
    })
    this.PostServ.DeletePost(sendForm.value).subscribe((res)=>{
      console.log(res)

      for( var i = 0; i < this.postList.length; i++){                           
        if ( this.postList[i]._id == post_id) { 
          this.postList.splice(i, 1); 
          i--; 
        }
      }
      console.log(this.postList)
      location.reload()
    })
  }

  askBeforeDeletePost(post_id:string){
    this.alertCtrl.create(
      {header: 'ลบโพสต์นี้?',
      message: 'คุณแน่ใจนะว่าต้องการลบโพสต์นี้',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel'
        },{
          text: 'แน่นอน',
          handler: () => {
            this.deletePost(post_id)
          }
        },
      ]
      }
    ).then(alertEl =>{
      alertEl.present()
    })
  }

  goToUpdate(post_ID:string,postData:any){
    console.log(post_ID)
    localStorage.setItem('selectPost',JSON.stringify(postData))
    this.router.navigateByUrl(`/update-user-post/${post_ID}`)
  }

  postMenu(post_id:string,postData:any) {
    this.alertCtrl.create(
      {header: 'เมนูเพิ่มเติมของโพสต์',
      message: 'คุณต้องการทำอะไรกับโพสต์นี้',
      buttons: [
        {
          text: 'แก้ไขโพสต์',
          handler: () => {
            this.goToUpdate(post_id,postData)
          }
        },{
          text: 'ลบโพสต์นี้',
          handler: () => {
            this.askBeforeDeletePost(post_id)
          }
        },
        {
          text: 'ปิดเมนู',
          role: 'cancel'
        },
      ]
      }
    ).then(alertEl =>{
      alertEl.present()
    })
  }


  goToSelectUserPage(selected_usr:any){
    this.router.navigateByUrl(`/account-detail/${selected_usr.username}`)
  }

  likeThisPost(post:any){
    console.log(post)
    let likeForm = {postId:post._id}
    this.PostServ.LikePost(likeForm).subscribe(
      (res) => {
        console.log(res)
        post.thisUserLike = !post.thisUserLike
        if (post.thisUserLike == true){
          post.likeCount += 1
        }
        else{
          post.likeCount -= 1
        }
      }
    )
  }

  goToCategory(tag_name:string){
    this.router.navigateByUrl(`/post-with-tag/${tag_name}`)
  }

  goToOnlyPost(post_id:string){
    this.router.navigateByUrl(`/post-with-id/${post_id}`)
  }

  async buyPost(postObject:any){
    
    const popover = await this.popOverCtrl.create({
      component: BuyPostComponent,
      dismissOnSelect: false,
      componentProps: { post_id:postObject._id,sell_price:postObject.purchase.price }
    });
    await popover.present();
  }

}


