import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostingService } from 'src/app/services/api/posting.service';
import { UserService } from 'src/app/services/api/user.service';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { CommentMenuComponent } from '../../shared-components/comment-menu/comment-menu.component';

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.scss'],
})
export class CommentPostComponent implements OnInit {
  @Input() post_id: string
  
  comment_list:any[] = []
  input_text:string = ''

  login_session = localStorage.getItem('current_log_uid')
  isLogin:boolean
  commentEditMode:boolean = false

  constructor(
    private router: Router,
    private PostServ: PostingService,
    private userServ: UserService,
    private alertCtrl: AlertController,
    public formBulider: FormBuilder,
    private popOverCtrl: PopoverController,
  ) { 
    this.isLogin = (localStorage.getItem('usr_login') != undefined)
  }

  ngOnInit() {
    console.log('load comment on post ' + this.post_id)
    this.PostServ.searchCommentOnPost(this.post_id).subscribe((res) => {
      console.log(res)
      this.comment_list = res.content
      if (this.comment_list.length != 0){
        for (let comment_detail of this.comment_list){
          this.userServ.ReqUserDetail(comment_detail.userId).subscribe((res) => {
            comment_detail.usr_profile_pic = res.profile_pic
            comment_detail.usr_name = res.username
          })
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
        console.log(res)
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

  async openCommentMenu(comment_id:string){
    this.popOverCtrl.create(({
      component: CommentMenuComponent,
      showBackdrop: true,
      componentProps: {
        commentId: comment_id
      },
      dismissOnSelect: true
    }) as any).then(popover => popover.present()); 
  }

  changeToEditMode(value:boolean){
    this.commentEditMode = value
    console.log(this.commentEditMode)
  }
}
