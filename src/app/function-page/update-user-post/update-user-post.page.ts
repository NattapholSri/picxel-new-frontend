import { Component,ViewChild ,OnInit} from '@angular/core';
import { UserService } from 'src/app/services/api/user.service';
import { PostUpdateComponent } from 'src/app/components/postCRUD/post-update/post-update.component';

@Component({
  selector: 'app-update-user-post',
  templateUrl: './update-user-post.page.html',
  styleUrls: ['./update-user-post.page.scss'],
})
export class UpdateUserPostPage implements OnInit {

  @ViewChild(PostUpdateComponent) child: PostUpdateComponent 

  constructor(userServ: UserService) {
    userServ.AutoLogout()
  }

  ngOnInit(): void {
    
  }

}
