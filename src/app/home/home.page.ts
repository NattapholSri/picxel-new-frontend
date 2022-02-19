import { Component } from '@angular/core';
import { UserService } from '../services/api/user.service';
import { PostingComponent } from '../components/posting/posting.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(userServ: UserService) {
    userServ.AutoLogout()
  }

}
