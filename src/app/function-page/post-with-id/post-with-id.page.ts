import { Component} from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { PostingService } from 'src/app/services/api/posting.service';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { AlertController,PopoverController } from '@ionic/angular';

import { PopUserMenuComponent } from 'src/app/components/shared-components/pop-user-menu/pop-user-menu.component';


@Component({
  selector: 'app-post-with-id',
  templateUrl: './post-with-id.page.html',
  styleUrls: ['./post-with-id.page.scss'],
})
export class PostWithIdPage {

  currentUser = localStorage.getItem('usr_login') // name of user who using now
  currentUserId = localStorage.getItem('current_log_uid')
  postData: any = {}
  knowtag: any[] = []
  u_detail: any;                                  // detail of user's of which account-detail page are loaded
  loadPostAtPage: number
  thisPostID:string

  tokenOn:boolean
  currentUserName = localStorage.getItem('usr_login')

  constructor(
    private router: Router,
    private PostServ: PostingService,
    private alertCtrl: AlertController,
    public formBulider: FormBuilder,
    public popoverCtrl: PopoverController,
    public activatedRt: ActivatedRoute,
    private popOverCtrl: PopoverController
  ) {
    this.loadPostAtPage = 1
    this.tokenOn = localStorage.getItem('jwt') != undefined
    this.u_detail = JSON.parse(localStorage.getItem('usernow'))
    this.thisPostID = this.activatedRt.snapshot.paramMap.get('postID')
    console.log(this.thisPostID)
    this.loadPost(this.thisPostID)
  }

  loadPost(p_id:string){
    this.PostServ.SearchPostById(p_id,2,this.loadPostAtPage).subscribe(
      (res) => {
        console.log(res)
        this.postData = res.content
        this.Post_Edit()
        console.log(this.postData)
      }
    )
  }

  private Post_Edit(){

      let localDate = new Date(this.postData.createdAt)
      this.postData.createdAt = localDate.toLocaleString('th-TH',{year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric'})
      let updateDate = new Date(this.postData.updatedAt)
      this.postData.updatedAt = updateDate.toLocaleString('th-TH',{year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric'})

      if (this.postData.likeCount != 0 && this.currentUserId != undefined){
        // console.log('load login user like status: ' + post._id)
        // let userWhoLikePost:any[] = []
        this.postData.thisUserLike = false
        this.PostServ.UserLikeOnPost(this.currentUserId,this.postData._id).subscribe(
          (res) => {
            // console.log(res.content)
            if (res.content != null && res.content != undefined){
              if (res.content.userId == this.currentUserId){
                this.postData.thisUserLike = true
            }
            console.log(this.postData) 
          }
        },(err) => {
          console.log(err)
        })
      }
  }

  addUserLikeList(post_id:string):any{
    let postLikeList:string[] = []
    this.PostServ.LikePostList(post_id).subscribe(
      (res) => {
        console.log(res)
        return postLikeList = res.content
      },(err) => {
        console.log(err)
        return postLikeList = []
      }
    )
    return postLikeList
  }

  deletePost(post_id:string){
    const sendForm = new FormGroup({
      postId: new FormControl(post_id)
    })
    this.PostServ.DeletePost(sendForm.value).subscribe((res)=>{
      console.log(res)

      for( var i = 0; i < this.postData.length; i++){                           
        if ( this.postData[i]._id == post_id) { 
          this.postData.splice(i, 1); 
          i--; 
        }
      }
      console.log(this.postData)
      this.router.navigateByUrl(`/account-detail/${this.u_detail.username}`)
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

  async dismissPopover(){
    await this.popoverCtrl.dismiss();
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

  async showUserMenu(){
    console.log('clicked')

    const popover = await this.popOverCtrl.create({
      component: PopUserMenuComponent,
      dismissOnSelect: true,
      componentProps: { username :this.currentUserName }
    });
    await popover.present();
  }
  
}
