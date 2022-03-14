import { Component,ViewChild } from '@angular/core';
import { UserService } from '../services/api/user.service';
import { PostCreateComponent } from '../components/postCRUD/post-create/post-create.component';
import { RandomAllPostComponent } from '../components/random-all-post/random-all-post.component';
import { SmartSearchboxComponent } from '../components/multi-page-use/smart-searchbox/smart-searchbox.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(PostCreateComponent) child: PostCreateComponent
   

  constructor(
    userServ: UserService
    ) {
    userServ.AutoLogout()
  }

}
