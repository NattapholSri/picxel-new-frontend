import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PostingService } from 'src/app/services/api/posting.service';
import { UserService } from 'src/app/services/api/user.service';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-comment-menu',
  templateUrl: './comment-menu.component.html',
  styleUrls: ['./comment-menu.component.scss'],
})
export class CommentMenuComponent /* implements OnInit */ {
  @Input() commentId:string
  @Output() editAllow = new EventEmitter<boolean>();

  constructor(
    private PostServ: PostingService,
    private userServ: UserService,
    private popOverCtrl: PopoverController
  ) { }

  // ngOnInit() {}

  clickFn(btn_name:string){
    console.log(btn_name + ' ' +this.commentId)
  }

  deleteComment(){
    this.PostServ.deleteComment(this.commentId).subscribe((res)=> {
      console.log(res)
      this.clickFn('Button 2')

      /* for (var i = 0; i < this.comment_list.length; i++){
        if (this.comment_list[i]._id == comment_id){
          this.comment_list.splice(i, 1); 
          i--;
        }
      } */
      location.reload()
    })

    
  }

  editRequest(){
    this.editAllow.emit(true)
    this.clickFn('presses btn 1')
    this.closePopover()
  }

  closePopover(){
    this.popOverCtrl.dismiss()
  }

}
