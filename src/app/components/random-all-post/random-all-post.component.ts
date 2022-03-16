import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostingService } from 'src/app/services/api/posting.service';
import { TagService } from 'src/app/services/api/tag.service';
import { UserService } from 'src/app/services/api/user.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';


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
  
  usr_use_now_id: any = localStorage.getItem('current_log_uid')
  loadPostAtPage: number
  canloadMore = true

  constructor(
    private router: Router,
    private PostServ: PostingService,
    private tagServ: TagService,
    private userServ: UserService,
    private activatedRt: ActivatedRoute,
    private alertCtrl: AlertController
  ) {
      this.loadPostAtPage = 1
      this.loadAllTag()
      this.knowtag = JSON.parse(localStorage.getItem('knowtag'))
      this.randomPost()
      console.log(this.usr_use_now_id)
  }

/*   ngOnInit() {
  } */

  randomPost(){
    this.PostServ.LoadRandomPost().subscribe((res) =>{
      this.postList = []
      console.log(res)
      this.postList = res
      this.Post_Edit()
    },(err) => console.log(err))
  }

  private Post_Edit(){
    for (let post of this.postList ){
      if(post.tags.length != 0){
        let tags_name_list = this.addTagName(post.tags)
        post.tags_Nlist = tags_name_list
        this.userServ.ReqUserDetail(post.userId).subscribe(
          (res) => {
            post.userName = res.username
            post.userPic = res.profile_pic
          }
        )
      }
      else{
        this.userServ.ReqUserDetail(post.userId).subscribe(
          (res) => {
            post.userName = res.username
            post.userPic = res.profile_pic
          }
        )
      }
      let localDate = new Date(post.createdAt)
      post.createdAt = localDate.toLocaleString('th-TH')
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

  /* addUserDataToPost(post:any){
    this.userServ.ReqUserDetail(post.userId).subscribe(
      (res) => {
        post.userName = res.username
        post.userPic = res.profile_pic
        }
      )
  } */

  goToSelectUserPage(selected_usr:any){
    this.router.navigateByUrl(`/account-detail/${selected_usr.username}`)
  }
}


