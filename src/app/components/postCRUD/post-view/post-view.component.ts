import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostingService } from 'src/app/services/api/posting.service';
import { TagService } from 'src/app/services/api/tag.service';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

import { BuyPostComponent } from '../../shared-components/buy-post/buy-post.component';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss'],
})
export class PostViewComponent{

  currentUser = localStorage.getItem('usr_login') // name of user who using now
  currentUserId = localStorage.getItem('current_log_uid')
  postList: any[] = []
  knowtag: any[] = []
  u_detail: any;                                  // detail of user's of which account-detail page are loaded
  loadPostAtPage: number
  canloadMore = true

  constructor(
    private router: Router,
    private PostServ: PostingService,
    private tagServ: TagService,
    private alertCtrl: AlertController,
    public formBulider: FormBuilder,
    public popOverCtrl: PopoverController
  ) {
      this.loadPostAtPage = 1
      this.loadAllTag()
      this.knowtag = JSON.parse(localStorage.getItem('knowtag'))
      this.u_detail = JSON.parse(localStorage.getItem('usernow'))
      let get_uid:string = this.u_detail._id
      this.userPost(get_uid)   
  }

  userPost(user_id:string){
    this.PostServ.SearchPost(user_id,6,this.loadPostAtPage).subscribe(
      (res) => {
        console.log(res)
        this.postList = res.content
        if (this.postList.length < 6){
          this.canloadMore = false
        }
        this.Post_Edit()
        console.log(this.postList)
      },(err) =>console.log(err)
    )
  }

  loadThisUsrMore(){
    this.loadAllTag()
    this.loadPostAtPage += 1;
    console.log(this.u_detail._id)
    this.PostServ.SearchPost(this.u_detail._id,6,this.loadPostAtPage).subscribe(
      (res) => {
        console.log(res)
        let MorePostList:any[] = res.content
        MorePostList = this.more_post_Edit(MorePostList)
        console.log(MorePostList)
        if (MorePostList.length < 6){
          this.canloadMore = false
          this.postList = this.postList.concat(MorePostList)
          console.log(this.postList)
        }
        else{
          this.postList = this.postList.concat(MorePostList)
          console.log(this.postList)
        }
      }
    )
  }

  private Post_Edit(){

    for (let post of this.postList ){
      console.log(post)

      let localDate = new Date(post.createdAt)
      post.createdAt = localDate.toLocaleString('th-TH',{year: '2-digit', month: 'short', day: 'numeric',hour:'numeric',minute:'numeric'})
      let updateDate = new Date(post.updatedAt)
      post.updatedAt = updateDate.toLocaleString('th-TH',{year: '2-digit', month: 'short', day: 'numeric',hour:'numeric',minute:'numeric'})

      if (post.likeCount != 0 && this.currentUserId != undefined){
        console.log('load login user like status: ' + post._id)
        // let userWhoLikePost:any[] = []
        post.thisUserLike = false
        this.PostServ.UserLikeOnPost(this.currentUserId,post._id).subscribe(
          (res) => {
            // console.log(res.content)
            if (res.content != null && res.content != undefined){
              if (res.content.userId == this.currentUserId){
                post.thisUserLike = true
            } 
          }
        },(err) => {
          console.log(err)
        })
      }
    }
  }

  more_post_Edit(input_array:any[]){

    let this_array = input_array

    for (let post of this_array){
      console.log(post)

      let localDate = new Date(post.createdAt)
      post.createdAt = localDate.toLocaleString('th-TH',{year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric'})
      let updateDate = new Date(post.updatedAt)
      post.updatedAt = updateDate.toLocaleString('th-TH',{year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric'})

      if (post.likeCount != 0 && this.currentUserId != undefined){
        console.log('load login user like status: ' + post._id)
        // let userWhoLikePost:any[] = []
        post.thisUserLike = false
        this.PostServ.UserLikeOnPost(this.currentUserId,post._id).subscribe(
          (res) => {
            // console.log(res.content)
            if (res.content != null && res.content != undefined){
              if (res.content.userId == this.currentUserId){
                post.thisUserLike = true
            } 
          }
        },(err) => {
          console.log(err)
        })
      }
    }
    return this_array
  }

  loadAllTag(){
    this.tagServ.GetAll().subscribe(
      (res) => {
        localStorage.setItem('knowtag',JSON.stringify(res.content))
        this.knowtag = res.content
      }
    )
  }

  addTagName(tag_id_list:string[]){
    let textTag: string[] = []
    for (let i of tag_id_list){
      for (let tag of this.knowtag){
        if (tag._id == i){
          textTag.push(tag.name)
        }
      }
    }
    return textTag
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

      for( var i = 0; i < this.postList.length; i++){                           
        if ( this.postList[i]._id == post_id) { 
          this.postList.splice(i, 1); 
          i--; 
        }
      }
      console.log(this.postList)
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
    localStorage.setItem('selectPostId',post_ID)
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
    await this.popOverCtrl.dismiss();
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
