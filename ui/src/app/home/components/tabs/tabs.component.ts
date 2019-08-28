import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  name = '!!!';
  viewMode = 'tab1';
  profile$: Observable<any>;

  constructor(private userService: UserService) {
    this.profile$ = this.userService.getProfile();
  }


  ngOnInit() {
  }

}
