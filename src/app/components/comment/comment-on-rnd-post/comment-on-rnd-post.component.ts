import { Component, Input, OnInit } from '@angular/core';

import { PostingService } from 'src/app/services/api/posting.service';
import { UserService } from 'src/app/services/api/user.service';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { CommentMenuComponent } from '../../shared-components/comment-menu/comment-menu.component';

@Component({
  selector: 'app-comment-on-rnd-post',
  templateUrl: './comment-on-rnd-post.component.html',
  styleUrls: ['./comment-on-rnd-post.component.scss'],
})
export class CommentOnRndPostComponent implements OnInit {

  @Input() post_id: string
  
  comment_list:any[] = []
  input_text:string = ''

  login_session = localStorage.getItem('current_log_uid')
  isLogin:boolean

  //allowCommentEdit:boolean = false
  commentEditMode:boolean = false
  EditingAtComment:string
  editMessage:string = ''

  constructor(
    private PostServ: PostingService,
    private userServ: UserService,
    private alertCtrl: AlertController,
    public formBulider: FormBuilder,
    private popOverCtrl: PopoverController
  ) { 
    this.isLogin = (localStorage.getItem('usr_login') != undefined)
  }

  ngOnInit() {
    //console.log('load comment on post ' + this.post_id)
    this.PostServ.searchCommentOnPost(this.post_id).subscribe((res) => {
      this.comment_list = res.content
      if (this.comment_list.length != 0){
        for (let comment_detail of this.comment_list){
          this.userServ.ReqUserDetail(comment_detail.userId).subscribe((res) => {
            comment_detail.usr_profile_pic = res.profile_pic
            comment_detail.usr_name = res.username
          })

          let raw_create_time = new Date(comment_detail.createdAt)
          let raw_update_time = new Date(comment_detail.updatedAt)
          comment_detail.createdAt = raw_create_time.toLocaleString('th-TH',{hour:'numeric',minute:'numeric', year: '2-digit', month: 'short', day: 'numeric'})
          comment_detail.updatedAt = raw_update_time.toLocaleString('th-TH',{hour:'numeric',minute:'numeric', year: '2-digit', month: 'short', day: 'numeric'})
        }
      }
    })
  }

  createComment(){
    if (!this.isLogin){
      alert('โปรดล็อกอินก่อนแสดงความคิดเห็น')
    }
    else{
      let commentForm = new FormGroup({
        postId: new FormControl(this.post_id),
        text: new FormControl(this.input_text)
      })
      this.PostServ.CommentOnPost(commentForm.value).subscribe((res) => {

        this.reloadComponent()
      })
    }
  }

  deleteComment(comment_id:string){
    this.PostServ.deleteComment(comment_id).subscribe((res)=> {
      console.log(res)
      for (var i = 0; i < this.comment_list.length; i++){
        if (this.comment_list[i]._id == comment_id){
          this.comment_list.splice(i, 1); 
          i--;
        }
      }
      //this.reloadComponent()
    })
  }

  reloadComponent() {
    location.reload()
  }

  async callMenu(commentId:string){
    this.popOverCtrl.create(({
      component: CommentMenuComponent,
      showBackdrop: true,
      componentProps: {
        commentId: commentId
      },
      dismissOnSelect: true
    }) as any).then(popover => {
      popover.present()
      return popover.onDidDismiss().then(
        (data: any) => {
          if (data) {
            console.log(data.editAllow + 'data retured')
          }
        })
    });
    
  }

  opMenu(commentData:any){
    console.log(commentData)
    this.alertCtrl.create(
      {header: 'เมนูเพิ่มเติมของความคิดเห็น',
      message: 'คุณต้องการทำอะไรกับความคิดเห็นนี้',
      buttons: [
        {
          text: 'แก้ไขความคิดเห็น',
          handler: () => {
            this.changeToEditMode(commentData._id,commentData.text)
          }
        },{
          text: 'ลบความคิดเห็นนี้',
          handler: () => {
            this.deleteComment(commentData._id)
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

  changeToEditMode(atComment:string,oldMessage?:string){
    this.commentEditMode = true
    this.EditingAtComment = atComment
    if (oldMessage != undefined){
      this.editMessage = oldMessage
    }
    console.log('edit comment mode')
    console.log(this.EditingAtComment)
  }

  cancelEditComment(){
    this.commentEditMode = false
    this.editMessage = ''
  }

  updateComment(comment_id:string){
    if (this.editMessage == ''){
      alert('ไม่สามารถแก้ไขได้ เนื่องจากไม่มีข้อความ')
    }
    else{
      let commentEditForm = new FormGroup({
        commentId: new FormControl(comment_id),
        text: new FormControl(this.editMessage)
      })
      console.log(commentEditForm.value)
      this.PostServ.updateComment(commentEditForm.value).subscribe((res) => {
        console.log(res)
        this.reloadComponent()
      })
    }
  }

  likeComment(){
    
  }

}
