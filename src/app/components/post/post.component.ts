import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostingService } from 'src/app/services/api/posting.service';
import { TagService } from 'src/app/services/api/tag.service';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {

  currentUser = localStorage.getItem('usr_login')
  postList: any[] = []
  knowtag: any[] = []
  postOfUser: string
  u_id: string
  u_detail: any;
  loadPostAtPage: number
  canloadMore = true

  constructor(
    private router: Router,
    private PostServ: PostingService,
    private tagServ: TagService,
    private userServ: UserService,
    private activatedRt: ActivatedRoute
  ) {
      this.loadPostAtPage = 1
      this.u_detail = JSON.parse(localStorage.getItem('usernow'))
      let get_uid:string = this.u_detail._id
      console.log(get_uid)
      this.userPost(get_uid)
  }

/*   ngOnInit() {
  } */

  randomPost(){
    // get all / randompost
  }

  userPost(user_id:string){
    this.PostServ.SearchPost(user_id,10,this.loadPostAtPage).subscribe(
      (res) => {
        console.log(res)
        this.postList = res.content
        console.log(this.postList)
      }
    )
  }

  loadThisUsrMore(){
    this.loadPostAtPage += 1;
    console.log(this.u_detail._id)
    this.PostServ.SearchPost(this.u_detail._id,10,this.loadPostAtPage).subscribe(
      (res) => {
        console.log(res)
        let MorePostList = res.content
        console.log(MorePostList)
        if (MorePostList.length === 0){
          this.canloadMore = false
        }
        else{
          this.postList += MorePostList 
          console.log(this.postList)
        }
      }
    )
  }

}
