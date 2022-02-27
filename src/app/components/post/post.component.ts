import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostingService } from 'src/app/services/api/posting.service';
import { TagService } from 'src/app/services/api/tag.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  currentUser = localStorage.getItem('usr_login')
  postList: any[] = []
  knowtag: any[] = []

  constructor(
    private router: Router,
    private PostServ: PostingService,
    private tagServ: TagService
  ) { let alltag = this.tagServ.GetAll()
      console.log(alltag)
  }

  ngOnInit() {}

  randomPost(){
    // get all / randompost
  }

  userPost(user_name:string){
    // get user's post
  }

}
