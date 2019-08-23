import { Component, OnInit } from '@angular/core';
import { AuthStoreService } from '../../services/auth-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authStore: AuthStoreService) {
   }

  ngOnInit() {
  }

}
