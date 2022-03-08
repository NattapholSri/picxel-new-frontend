import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user_loggin_in:string
  usr_account_page:string

  constructor() { 
    this.user_loggin_in = localStorage.getItem('usr_login')
    this.usr_account_page = `account-detail/${this.user_loggin_in}`
  }

  ngOnInit() {

  }

}
