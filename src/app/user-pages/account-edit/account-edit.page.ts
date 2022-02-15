import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { UserService } from '../../services/api/user.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.page.html',
  styleUrls: ['./account-edit.page.scss'],
})
export class AccountEditPage implements OnInit {

  gender: string;
  picture_link: string;
  firstname: string;
  user_now: string;

  constructor(
    public formBulider: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userServ: UserService,
  ) { 
    this.user_now = localStorage.getItem('usr_login')
    this.userServ.ReqUserDetail('')
  }

  ngOnInit() {
    
  }

  updateAll(){
    const editForm = new FormGroup({
      gender: new FormControl(this.gender, Validators.required),
      picture_url: new FormControl(this.picture_link, Validators.required),
      firstname: new FormControl(this.firstname, Validators.required)
    })
    console.log(editForm.value)
  }



}
