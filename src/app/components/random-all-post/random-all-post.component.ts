import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostingService } from 'src/app/services/api/posting.service';
import { TagService } from 'src/app/services/api/tag.service';
import { UserService } from 'src/app/services/api/user.service';
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
      this.loadAllTag()
      this.knowtag = JSON.parse(localStorage.getItem('knowtag'))
      this.u_detail = JSON.parse(localStorage.getItem('usernow'))
      // this.AllRndPost()
      
  }

/*   ngOnInit() {
  } */

  randomPost(){
    // get all / randompost
  }

  userPost(user_id:string){
    this.PostServ.SearchPost(user_id,10,this.loadPostAtPage).subscribe(
      (res) => {
        this.postList = res.content
        if (this.knowtag != []){
          this.Post_Edit()
        }
        console.log(this.postList)
      }
    )
  }

  loadThisUsrMore(){
    this.loadAllTag()
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

  private Post_Edit(){

    for (let post of this.postList ){
      if(post.tags.length != 0){
        let tags_name_list = this.addTagName(post.tags)
        post.tags_Nlist = tags_name_list
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

  goToUser(){

  }

  goToTag(){
    // add method to go tag
  }

}

