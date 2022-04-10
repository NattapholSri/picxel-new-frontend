import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FollowUserService } from 'src/app/services/api/follow-user.service';

@Component({
  selector: 'app-user-suggest',
  templateUrl: './user-suggest.component.html',
  styleUrls: ['./user-suggest.component.scss'],
})
export class UserSuggestComponent {

  suggest_usr_list:any[] = []

  constructor(
    private followUsrServ:FollowUserService,
    private router:Router
  ) 
  {
    this.followUsrServ.suggestRandomUser().subscribe(
      (res) =>{
        console.log(res.users)
        this.suggest_usr_list = res.users
      },(err) => console.log(err)

    )
  }

  toUser(username:string){
    this.router.navigateByUrl(`/account-detail/${username}`)
  }

}
