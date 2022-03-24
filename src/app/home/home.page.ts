import { Component,ViewChild } from '@angular/core';
import { UserService } from '../services/api/user.service';
import { PostCreateComponent } from '../components/postCRUD/post-create/post-create.component';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(PostCreateComponent) child: PostCreateComponent
   
  tokenOn:boolean

  constructor(
    userServ: UserService
    ) {
    userServ.AutoLogout()
    this.tokenOn = localStorage.getItem('jwt') != undefined
  }

}
