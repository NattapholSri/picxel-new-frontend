import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostingService } from 'src/app/services/api/posting.service';
import { TagService } from 'src/app/services/api/tag.service';
import { UserService } from 'src/app/services/api/user.service';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-smart-searchbox',
  templateUrl: './smart-searchbox.component.html',
  styleUrls: ['./smart-searchbox.component.scss'],
})
export class SmartSearchboxComponent {
  search_text:string = ''

  tempSearch:any[] = []
  searchMode:number = 1
  ownPage = false

  constructor(
    public formBulider: FormBuilder,
    private router: Router,
    private postServ: PostingService,
    private tagServ: TagService,
    private userServ: UserService
  ) { }

  q_searchJunction(){
    this.tempSearch = []
    let data_limit = 5
    if (this.ownPage){
      data_limit = 10
    }
    //username search
    if (this.searchMode == 1 && this.search_text != ''){
      this.userServ.SearchUser(this.search_text,5)
      .subscribe((res) => {
        console.log(res)
        this.tempSearch = res.content
        console.log(this.tempSearch)
      })
    }

    // search tag Filter
    else if (this.searchMode == 2 && this.search_text != ''){
      
      this.tagServ.SearchTag(this.search_text).subscribe((res) => {
        let tagDatabase = res
        this.tempSearch = tagDatabase['content']
        console.log(this.tempSearch)
      })
    }
  }

  navigateToDetail(userData:any){
    this.router.navigateByUrl(`/account-detail/${userData.username}`)
  }

}
