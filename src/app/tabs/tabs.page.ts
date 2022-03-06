import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user_loggin_in:string

  constructor() { 
    this.user_loggin_in = localStorage.getItem('usr_login')
  }

  ngOnInit() {

  }

}
