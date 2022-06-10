import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../providers/account.service';
import {User} from '../../model/user';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements OnInit {
  user: User;

  constructor(public accountService: AccountService) { }

  ngOnInit() {
    this.user = this.accountService.userValue;

  }

  logout() {
    this.accountService.logout();

  }

}
