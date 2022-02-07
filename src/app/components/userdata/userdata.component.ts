import { Component, OnInit,NgZone } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';

import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.scss'],
})
export class UserdataComponent implements OnInit {


  constructor(public formBulider:FormBuilder,
    private router: Router, private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { 

  }

  ngOnInit() {}

}
